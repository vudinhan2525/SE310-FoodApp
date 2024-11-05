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
                        var cartItems = await _context.UserFoodOrders
                            .Where(o => o.UserId == user.UserId)
                            .Select(o => new
                            {
                                o.OrderId,
                                o.FoodId,
                                o.Quantity,
                                o.Note,
                                FoodDetails = new
                                {
                                    o.Food.Name,
                                    o.Food.Description,
                                    o.Food.Image1,
                                    o.Food.Price // You can include any additional properties from the Food table as needed
                                }
                            })
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
                                userSaved = savedFoodIds ,
                                userCart = cartItems
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
        [HttpGet("getAllFoodSaved")]
        public async Task<IActionResult> GetAllFoodSaved(int userId, int page = 1, int limit = 10)
        {
            // Validate input
            if (userId <= 0)
            {
                return BadRequest(new { status = "error", message = "Invalid user ID." });
            }

            if (page <= 0 || limit <= 0)
            {
                return BadRequest(new { status = "error", message = "Page and limit must be greater than zero." });
            }

            // Calculate the number of items to skip based on the current page and limit
            int skip = (page - 1) * limit;

            // Retrieve the saved food items for the user with pagination
            var savedFoodsQuery = _context.UserFoodSaved
                .Where(ufs => ufs.UserId == userId)
                .Include(ufs => ufs.Food); // Include related Food data if needed

            // Get the paginated list of saved food items
            var savedFoods = await savedFoodsQuery
                .Skip(skip)
                .Take(limit)
                .Select(ufs => new
                {
                    ufs.FoodId,
                    FoodName = ufs.Food.Name,
                    ufs.Food.Image1,
                    ufs.Food.Image2,
                    ufs.Food.Image3,
                    ufs.Food.Price,
                    ufs.Food.Itemleft,
                    ufs.Food.Rating,
                    ufs.Food.NumberRating,
                    ufs.Food.Description
                })
                .ToListAsync();

            // Retrieve total count for pagination metadata
            int totalItems = await savedFoodsQuery.CountAsync();

            // Calculate total pages based on item count and limit
            int totalPages = (int)Math.Ceiling(totalItems / (double)limit);

            // Return paginated response
            return Ok(new
            {
                status = "success",
                data = savedFoods,
                pagination = new
                {
                    currentPage = page,
                    pageSize = limit,
                    totalItems,
                    totalPages
                }
            });
        }
        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto updatedUser)
        {
            if (updatedUser == null || updatedUser.UserId <= 0)
            {
                return BadRequest("Invalid user data.");
            }

            // Find the user in the database
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == updatedUser.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Update the user's information
            user.Username = updatedUser.Username;
            user.Email = updatedUser.Email;
            user.Address = updatedUser.Address;
            
             if (!string.IsNullOrWhiteSpace(updatedUser.Avatar))
                {
                    user.Avatar = updatedUser.Avatar; // Update the avatar only if provided
                }

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { status = "success", message = "User updated successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error updating user: " + ex.Message);
                return StatusCode(500, "An error occurred while updating the user.");
            }
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
        public record UpdateUserDto(int UserId, string Username, string Email, string Address, string Avatar);
    }
}
