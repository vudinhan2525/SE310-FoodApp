using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {   
        // POST: api/v1/user
        [HttpPost]
        public IActionResult CreateUser([FromBody] CreateUserDto newUser)
        {
            // In a real scenario, you would save the user to a database
            return Ok();
        }

        // DELETE: api/v1/user/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            // In a real scenario, you would delete the user from the database
            return NoContent();
        }
    }

    public record CreateUserDto(string Name, string Email);
}
