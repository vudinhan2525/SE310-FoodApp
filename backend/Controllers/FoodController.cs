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
    public class FoodController : ControllerBase
    {   

        private readonly AppDbContext _context;
        private readonly ILogger<UserController> _logger;
        public FoodController(AppDbContext context, ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }
        //GET : api/v1/Food
        [HttpGet]
        public async Task<IActionResult> GetAllFood(int page = 1, int limit = 10, string type = null)
        {
            if (page <= 0 || limit <= 0)
            {
                return BadRequest(new { status = "error", message = "Page and limit must be greater than zero." });
            }

            // Calculate the number of items to skip based on the current page and limit
            int skip = (page - 1) * limit;

            // Create the queryable for food items
            var query = _context.Foods.AsQueryable();

            // Apply filtering by food type if specified
            if (!string.IsNullOrWhiteSpace(type))
            {
                query = query.Where(f => f.FoodType.NameType == type);
            }

            // Retrieve paginated list of Food items with projected FoodType data
            var foods = await query
                .Include(f => f.FoodType)  // Include related FoodType data if needed
                .Skip(skip)
                .Take(limit)
                .Select(f => new
                {
                    f.FoodId,
                    f.Name,
                    f.Image1,
                    f.Image2,
                    f.Image3,
                    f.Price,
                    f.Itemleft,
                    f.Rating,
                    f.NumberRating,f.Description,
                    FoodType = new
                    {
                        f.FoodType.TypeId,
                        f.FoodType.NameType
                    }
                })
                .ToListAsync();

            // Retrieve total count for pagination metadata after filtering
            int totalItems = await query.CountAsync();

            // Calculate total pages based on item count and limit
            int totalPages = (int)Math.Ceiling(totalItems / (double)limit);

            // Return paginated response
            return Ok(new
            {
                status = "success",
                data = foods,
                pagination = new
                {
                    currentPage = page,
                    pageSize = limit,
                    totalItems,
                    totalPages
                }
            });
        }

        [HttpGet("newest")]
        public async Task<IActionResult> GetNewestFood(int page = 1, int limit = 10)
        {
            // Adjust for pagination
            var skip = (page - 1) * limit;

            // Fetch and order the newest food items based on FoodId in descending order
            var newestFoodItems = await _context.Foods
                .OrderByDescending(f => f.FoodId)
                .Skip(skip)
                .Take(limit)
                .Select(f => new
                {
                    f.FoodId,
                    f.Name,
                    f.Image1,
                    f.Image2,
                    f.Image3,
                    f.Rating,
                    f.NumberRating,
                    f.Price,
                    f.Itemleft,f.Description,
                    FoodType = new
                    {
                        f.FoodType.TypeId,
                        f.FoodType.NameType
                    }
                })
                .ToListAsync();

            // Retrieve total count for pagination metadata
            int totalItems = await _context.Foods.CountAsync();

            // Calculate total pages based on item count and limit
            int totalPages = (int)Math.Ceiling(totalItems / (double)limit);

            // Return the result with pagination metadata
            return Ok(new
            {
                status = "success",
                data = newestFoodItems,
                pagination = new
                {
                    currentPage = page,
                    pageSize = limit,
                    totalItems,
                    totalPages
                }
            });
        }
    
        [HttpGet("search")]
        public async Task<IActionResult> SearchFood(int page = 1, int limit = 10, string kw = null)
        {
            // Adjust pagination parameters
            var skip = (page - 1) * limit;

            // Start querying from the Foods context
            var query = _context.Foods.AsQueryable();

            // If a keyword is provided, filter by it (e.g., by Name or other fields)
            if (!string.IsNullOrEmpty(kw))
            {
                query = query.Where(f => f.Name.Contains(kw) ); // adjust fields as needed
            }

            // Apply ordering, pagination, and projection
            var foodResults = await query
                .OrderByDescending(f => f.FoodId) // Order by newest (or adjust as necessary)
                .Skip(skip)
                .Take(limit)
                .Select(f => new
                {
                    f.FoodId,
                    f.Name,
                    f.Image1,
                    f.Image2,
                    f.Image3,
                    f.Rating,
                    f.NumberRating,
                    f.Price,
                    f.Itemleft,
                    f.Description,
                    FoodType = new
                    {
                        f.FoodType.TypeId,
                        f.FoodType.NameType
                    }
                })
                .ToListAsync();

            return Ok(new
            {
                status = "success",
                data = foodResults,
                currentPage = page,
                pageSize = limit,
                totalItems = await query.CountAsync() 
            });
        }
    
    }
}
