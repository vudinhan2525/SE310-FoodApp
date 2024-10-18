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
                        return Ok(new
                        {
                            message = "success",
                            user = new
                            {
                                user.Username,
                                user.Email,
                                user.Address,
                                user.Avatar
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
                return BadRequest("Password and confirmation password do not match.");
            }
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == newUser.email);
            if (existingUser != null)
            {
                return Ok(new {
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
                message = "success",
            });
        }
        // DELETE: api/v1/user/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            // In a real scenario, you would delete the user from the database
            return NoContent();
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
    }
}
