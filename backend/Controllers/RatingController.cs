
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RatingController : ControllerBase
    {   

        private readonly AppDbContext _context;
        private readonly ILogger<RatingController> _logger;
        public RatingController(AppDbContext context, ILogger<RatingController> logger)
        {
            _context = context;
            _logger = logger;
        }
        // GET: api/rating?foodId=1
        [HttpGet]
        public async Task<IActionResult> GetRatingByFoodId(int page, int limit, int foodId)
        {
            // Validate parameters
            if (foodId <= 0)
            {
                return BadRequest("Invalid food ID.");
            }

            if (page <= 0 || limit <= 0)
            {
                return BadRequest("Page and limit must be greater than zero.");
            }

            // Calculate total items
            var totalItems = await _context.Ratings.CountAsync(r => r.FoodId == foodId);
            var totalPages = (int)Math.Ceiling((double)totalItems / limit);

            // Fetch ratings with pagination and include User data
            var ratings = await _context.Ratings
                .Include(r => r.User) // Include User information
                .Where(r => r.FoodId == foodId)
                .OrderByDescending(r => r.Date)
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            if (ratings == null || !ratings.Any())
            {
                return NotFound($"No ratings found for food ID {foodId}.");
            }

            return Ok(new
            {
                status = "success",
                data = ratings.Select(r => new
                {
                    r.RatingId,
                    r.UserId,
                    r.FoodId,
                    r.Content,
                    r.Date,
                    r.RatingValue,
                    r.Reply,
                    r.DateReply,
                    User = new // Include user data in the response
                    {
                        r.User.UserId,
                        r.User.Username, // Include only the specified user properties
                        r.User.Email,
                        r.User.Avatar
                    }
                }),
                pagination = new
                {
                    currentPage = page,
                    pageSize = limit,
                    totalItems,
                    totalPages
                }
            });
        }
    }
}
