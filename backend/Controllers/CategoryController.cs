using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(AppDbContext context, ILogger<CategoryController> logger)
        {
            _context = context;
            _logger = logger;
        }
        // Fetch all categories
        [HttpGet("getAllFoodTypes")]
        public async Task<IActionResult> GetAllFoodTypes()
        {
            try
            {
                var foodTypes = await _context.FoodTypes
                    .Select(ft => new { ft.TypeId, ft.NameType })
                    .ToListAsync();

                return Ok(new
                {
                    status = "success",
                    data = foodTypes
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching food types.");
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }
    }
}
