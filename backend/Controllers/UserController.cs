using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {   

        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UserController> _logger;
        public UserController(AppDbContext context, IConfiguration configuration, ILogger<UserController> logger)
        {
            _context = context;
            _configuration = configuration; 
            _logger = logger;
        }
        [HttpGet("checkjwt")]
        public async Task<IActionResult> CheckJWT()
        {
            var token = Request.Cookies["jwt"];
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized("No token found.");
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]); // Make sure this is set in appsettings.json

            try
            {
                // Validate the token
                var claimsPrincipal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["Jwt:Issuer"], // Set this in appsettings.json
                    ValidateAudience = true,
                    ValidAudience = _configuration["Jwt:Audience"], // Set this in appsettings.json
                    ClockSkew = TimeSpan.Zero // Optional: Reduce the time skew to avoid issues
                }, out SecurityToken validatedToken);

                // Retrieve the user ID from claims
                var userIdClaim = claimsPrincipal.FindFirst("id")?.Value;

                if (userIdClaim != null)
                {
                    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId.ToString() == userIdClaim);
                    
                    if (user != null)
                    {
                        // Fetch saved food IDs
                        var savedFoodIds = await _context.UserFoodSaved
                            .Where(u => u.UserId == user.UserId)
                            .Select(u => u.FoodId.ToString())
                            .ToListAsync();

                        return Ok(new
                        {
                            message = "success",
                            user = new
                            {   user.UserId,
                                user.Username,
                                user.Email,
                                user.Address,
                                user.Avatar,
                                userSaved = savedFoodIds 
                            }
                        });
                    }
                    return NotFound("User not found.");
                }

                return Unauthorized("Invalid token.");
            }
            catch (Exception ex)
            {
                // Handle token validation exceptions
                return Unauthorized("Token validation failed: " + ex.Message);
            }
        }

        // POST: api/v1/user
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto newUser)
        {
            if (newUser.password != newUser.passwordConfirm)
            {
                return Ok(new {
                    status = "failed",
                    message = "Password and confirmation password do not match."
                });
            }
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == newUser.email);
            if (existingUser != null)
            {
                return Ok(new {
                    status = "failed",
                    message = "Email has been used!",
                });
            }
            var passwordHasher = new PasswordHasher<User>();
            var user = new User
            {
                Username = newUser.firstName + " " + newUser.lastName,
                Email = newUser.email,
                Address = "",
                Avatar = "https://shopcartimg2.blob.core.windows.net/shopcartctn/avatar3d.jpg"  
            };
            user.Password = passwordHasher.HashPassword(user, newUser.password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Generate the token
            var token = GenerateJwtToken(user);
            // Set the token as a cookie
            SetJwtCookie(token);
            return Ok(new
            {   
                status = "success",
                message = "Register successfully",
            });
        }
        //POST : api/v1/user/login
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginBodyDto loginBody){
            // Find the user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginBody.email);
            if (user == null)
            {
                return Ok(new
                {   
                    status = "failed",
                    message = "Invalid email or password."
                });
            }

            // Verify the password
            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(user, user.Password, loginBody.password);
            if (result == PasswordVerificationResult.Failed)
            {
                return Ok(new
                {   status = "failed",
                    message = "Invalid email or password."
                });
            }

            // Generate the token
            var token = GenerateJwtToken(user);

            // Set the token as a cookie (optional)
            SetJwtCookie(token);

            return Ok(new
            {   status = "success",
                message = "Login successfully",
            });
        }
        //GET : api/v1/user/logout
        [HttpGet("logout")]
        public IActionResult LogoutUser(){
            // Clear the JWT token cookie
            Response.Cookies.Delete("jwt"); 

            return Ok(new
            {   
                status = "success",
                message = "Logged out successfully."
            });
        }
        // DELETE: api/v1/user/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            // In a real scenario, you would delete the user from the database
            return NoContent();
        }
        [HttpPost("removeFoodSaved")]
        public async Task<IActionResult> RemoveFoodSaved([FromBody] UserFoodDto userFood)
        {
            // Validate the input
            if (userFood == null || userFood.userId <= 0 || userFood.foodId <= 0)
            {
                return BadRequest("Invalid input.");
            }

            // Find the UserFoodSaved entry to remove
            var userFoodSaved = await _context.UserFoodSaved
                .FirstOrDefaultAsync(ufs => ufs.UserId == userFood.userId && ufs.FoodId == userFood.foodId );
            
            if (userFoodSaved == null)
            {
                return NotFound("Food item not found in user's saved foods.");
            }

            // Remove the entry
            _context.UserFoodSaved.Remove(userFoodSaved);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Food item removed from saved foods successfully." });
        }
        [HttpPost("addFoodSaved")]
        public async Task<IActionResult> AddFoodSaved([FromBody] UserFoodDto userFood)
        {
            if (userFood == null)
            {
                return BadRequest("UserFood data is null.");
            }

            // Check if the user and food already exist in the UserFoodSaved table
            var existingUserFood = await _context.UserFoodSaved.FindAsync(userFood.userId, userFood.foodId);
            if (existingUserFood != null)
            {
                return Conflict("This food item is already saved for the user.");
            }

            var userFoodSaved = new UserFoodSaved
            {
                UserId = userFood.userId,
                FoodId = userFood.foodId
            };

            // Add the new entry to the UserFoodSaved table
            _context.UserFoodSaved.Add(userFoodSaved);
            await _context.SaveChangesAsync();

            return Ok("Food item successfully saved for the user.");
        }
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("id", user.UserId.ToString()) 
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"], 
                    audience: _configuration["Jwt:Audience"], 
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds);

                return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private void SetJwtCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,    
                Expires = DateTime.Now.AddDays(1), 
                Secure = true,      
                SameSite = SameSiteMode.None      
            };
            
            Response.Cookies.Append("jwt", token, cookieOptions);
        }
        public record CreateUserDto(string firstName, string lastName, string email,string password,string passwordConfirm);
        public record LoginBodyDto(string email, string password);
        public record UserFoodDto(int userId, int foodId);
    }
}
