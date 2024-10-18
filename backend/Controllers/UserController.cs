using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {   

        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
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
            return Ok(new
            {
                message = "success",
                data = user 
            });
        }

        // DELETE: api/v1/user/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            // In a real scenario, you would delete the user from the database
            return NoContent();
        }
    }

    public record CreateUserDto(string firstName, string lastName, string email,string password,string passwordConfirm);
}
