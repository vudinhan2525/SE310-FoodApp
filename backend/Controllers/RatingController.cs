
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
    
        [HttpPost]
        public async Task<IActionResult> CreateRating([FromBody] RatingBodyDto ratingBody)
        {
            // Validate user and food existence
            var userExists = await _context.Users.AnyAsync(u => u.UserId == ratingBody.userId);
            var foodExists = await _context.Foods.AnyAsync(f => f.FoodId == ratingBody.foodId);

            if (!userExists)
            {
                return BadRequest("User does not exist.");
            }
            
            if (!foodExists)
            {
                return BadRequest("Food item does not exist.");
            }

            // Create a new Rating object
            var newRating = new Rating
            {
                UserId = ratingBody.userId,
                FoodId = ratingBody.foodId,
                Content = ratingBody.content,
                RatingValue = ratingBody.ratingValue,
                Date = DateTime.UtcNow
            };

            // Add and save the new rating
            try
            {
                _context.Ratings.Add(newRating);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "success",
                    message = "Rating created successfully.",
                    data = newRating
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating rating.");
                return StatusCode(500, "An error occurred while creating the rating.");
            }
        }
        [HttpPost("/update")]
        public async Task<IActionResult> UpdateRating([FromBody] UpdateRatingDto ratingBody)
        {
            // Find the rating by ratingId
            var rating = await _context.Ratings
                .FirstOrDefaultAsync(r => r.RatingId == ratingBody.ratingId);

            if (rating == null)
            {
                return NotFound("Rating not found for the given ID.");
            }

            // Update the rating properties
            rating.Content = ratingBody.content;
            rating.RatingValue = ratingBody.ratingValue;
            rating.Date = DateTime.UtcNow; // Update the date to the current date/time

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    status = "success",
                    message = "Rating updated successfully.",
                    data = rating
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating rating.");
                return StatusCode(500, "An error occurred while updating the rating.");
            }
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteRating(int ratingId)
        {
            // Find the rating by ratingId
            var rating = await _context.Ratings.FindAsync(ratingId);

            if (rating == null)
            {
                return NotFound("Rating not found for the given ID.");
            }

            // Remove the rating from the database
            _context.Ratings.Remove(rating);

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    status = "success",
                    message = "Rating deleted successfully."
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting rating.");
                return StatusCode(500, "An error occurred while deleting the rating.");
            }
        }
        public record RatingBodyDto(int userId, int foodId,string content,int ratingValue);
        public record UpdateRatingDto(int ratingId,string content,int ratingValue);
    
    }
}
