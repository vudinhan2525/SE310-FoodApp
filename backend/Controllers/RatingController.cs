
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

            if (foodId <= 0)
            {
                return BadRequest("Invalid food ID.");
            }

            if (page <= 0 || limit <= 0)
            {
                return BadRequest("Page and limit must be greater than zero.");
            }


            var totalItems = await _context.Ratings.CountAsync(r => r.FoodId == foodId);
            var totalPages = (int)Math.Ceiling((double)totalItems / limit);


            var ratings = await _context.Ratings
                .Include(r => r.User) 
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
                    User = new 
                    {
                        r.User.UserId,
                        r.User.Username, 
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


            var newRating = new Rating
            {
                UserId = ratingBody.userId,
                FoodId = ratingBody.foodId,
                Content = ratingBody.content,
                RatingValue = ratingBody.ratingValue,
                Date = DateTime.UtcNow
            };

            try
            {
                _context.Ratings.Add(newRating);
                await _context.SaveChangesAsync();
                

                await UpdateFoodRatingAndStats(ratingBody.foodId);

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
        
        [HttpPost("/api/v1/Rating/update")]
        public async Task<IActionResult> UpdateRating([FromBody] UpdateRatingDto ratingBody)
        {

            var rating = await _context.Ratings
                .FirstOrDefaultAsync(r => r.RatingId == ratingBody.ratingId);

            if (rating == null)
            {
                return NotFound("Rating not found for the given ID.");
            }
            int originalFoodId = rating.FoodId;

            rating.Content = ratingBody.content;
            rating.RatingValue = ratingBody.ratingValue;
            rating.Date = DateTime.UtcNow; 


            try
            {
                await _context.SaveChangesAsync();
                await UpdateFoodRatingAndStats(originalFoodId);
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
        [HttpPost("/dasdsa")]
        public async Task UpdateFoodRatingAndStats(int foodId)
        {
            try 
            {
                var foodRatings = await _context.Ratings
                    .Where(r => r.FoodId == foodId)
                    .ToListAsync();

                if (!foodRatings.Any())
                {
                    var foodToUpdate = await _context.Foods
                        .FirstOrDefaultAsync(f => f.FoodId == foodId);

                    if (foodToUpdate != null)
                    {
                        foodToUpdate.Rating = 0;
                        foodToUpdate.NumberRating = 0;
                        await _context.SaveChangesAsync();
                        return;
                    }
                }

                decimal averageRating = foodRatings.Average(r => r.RatingValue);
                int numberOfRatings = foodRatings.Count;

                var food = await _context.Foods
                    .FirstOrDefaultAsync(f => f.FoodId == foodId);

                if (food != null)
                {
                    food.Rating = Math.Round(averageRating, 2);
                    food.NumberRating = numberOfRatings;
                    
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating food rating for FoodId {foodId}");
                throw;
            }
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteRating(int ratingId)
        {
            
            var rating = await _context.Ratings.FindAsync(ratingId);

            if (rating == null)
            {
                return NotFound("Rating not found for the given ID.");
            }
            int originalFoodId = rating.FoodId;

            _context.Ratings.Remove(rating);

            try
            {
                await _context.SaveChangesAsync();

                await UpdateFoodRatingAndStats(originalFoodId);
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

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetRatingByUserId(int userId, int page = 1, int limit = 10)
        {
            if (userId <= 0)
            {
                return BadRequest("Invalid user ID.");
            }

            if (page <= 0 || limit <= 0)
            {
                return BadRequest("Page and limit must be greater than zero.");
            }

            var totalItems = await _context.Ratings.CountAsync(r => r.UserId == userId);
            var totalPages = (int)Math.Ceiling((double)totalItems / limit);

            var ratings = await _context.Ratings
                .Include(r => r.Food) 
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.Date)
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            if (ratings == null || !ratings.Any())
            {
                return NotFound($"No ratings found for user ID {userId}.");
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
                    Food = new 
                    {
                        r.Food.FoodId,
                        r.Food.Name, 
                        r.Food.Description 
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

        
        public record RatingBodyDto(int userId, int foodId,string content,int ratingValue);
        public record UpdateRatingDto(int ratingId,string content,int ratingValue);
    
    }
}
