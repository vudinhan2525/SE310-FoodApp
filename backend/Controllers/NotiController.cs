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
    public class NotiController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<NotiController> _logger;

        public NotiController(AppDbContext context, ILogger<NotiController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllNoti([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            if (page <= 0 || limit <= 0)
            {
                return BadRequest("Page and limit must be greater than zero.");
            }

            var totalItems = await _context.Notis.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)limit);

            var notifications = await _context.Notis
                .OrderByDescending(n => n.Date)
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            return Ok(new
            {
                status = "success",
                data = notifications,
                pagination = new
                {
                    currentPage = page,
                    pageSize = limit,
                    totalItems,
                    totalPages
                }
            });
        }

        [HttpGet("getByUser/{userId}")]
        public async Task<IActionResult> GetNotiByUser(int userId, [FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            if (page <= 0 || limit <= 0)
            {
                return BadRequest("Page and limit must be greater than zero.");
            }

            var totalItems = await _context.Notis
                .Where(n => n.UserId == userId)
                .CountAsync();

            var totalPages = (int)Math.Ceiling(totalItems / (double)limit);

            var notifications = await _context.Notis
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.Date)
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            return Ok(new
            {
                status = "success",
                data = notifications,
                pagination = new
                {
                    currentPage = page,
                    pageSize = limit,
                    totalItems,
                    totalPages
                }
            });
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteNoti(int id)
        {
            var notification = await _context.Notis.FindAsync(id);
            if (notification == null)
            {
                return NotFound(new { status = "error", message = "Notification not found." });
            }
            _context.Notis.Remove(notification);
            await _context.SaveChangesAsync();
            return Ok(new { status = "success", message = "Notification deleted successfully." });
        }
    }
}
