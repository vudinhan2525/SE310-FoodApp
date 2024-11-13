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
             .Select(ft => new
             {
                 ft.TypeId,
                 ft.NameType,
                 ft.ParentId,
                 totalFood = _context.Foods.Count(f => f.TypeId == ft.TypeId ||
                 _context.FoodTypes.Count(t => t.TypeId == f.TypeId && t.ParentId == ft.TypeId) != 0) // Đếm số lượng sản phẩm cho mỗi FoodType
             })
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
        [HttpGet("getFoodTypeById/{id}")]
        public async Task<IActionResult> GetFoodTypeById(int id)
        {
            try
            {
                var foodType = await _context.FoodTypes
                    .Where(ft => ft.TypeId == id)
                    .Select(ft => new { ft.TypeId, ft.NameType })
                    .FirstOrDefaultAsync();

                if (foodType == null)
                {
                    return NotFound(new
                    {
                        status = "error",
                        message = "Food type not found"
                    });
                }

                return Ok(new
                {
                    status = "success",
                    data = foodType
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching food type by ID.");
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }
        [HttpPost("addType")]
        public async Task<IActionResult> AddNewType([FromBody] FoodTypeDto newFoodType)
        {
            if (newFoodType == null || string.IsNullOrWhiteSpace(newFoodType.NameType))
            {
                return BadRequest(new { status = "error", message = "Error" });
            }

            try
            {
                // Tạo một FoodType mới từ dữ liệu DTO
                var foodType = new FoodType
                {
                    NameType = newFoodType.NameType,
                    ParentId = newFoodType.ParentId
                };
                var parent = await _context.FoodTypes.FindAsync(newFoodType.ParentId);
                if (parent != null && parent.ParentId != 0)
                {
                    return Ok(new { status = "error", message = "Parent type is a child type." });
                }

                // Thêm vào DbContext
                _context.FoodTypes.Add(foodType);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "success",
                    data = new { foodType.TypeId, foodType.NameType, foodType.ParentId, totalFood = 0 }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = "Error" });
            }
        }
        [HttpDelete("{typeId}")]
        public async Task<IActionResult> DeleteFoodType(int typeId)
        {
            try
            {
                var foodType = await _context.FoodTypes.FindAsync(typeId);

                if (foodType == null)
                {
                    return NotFound(new { status = "error", message = "Food type not found." });
                }

                // Remove the FoodType
                var childType = _context.FoodTypes.Where(f => f.ParentId == typeId);
                _context.RemoveRange(childType);
                _context.FoodTypes.Remove(foodType);
                await _context.SaveChangesAsync();

                return Ok(new { status = "success", message = "Food type deleted successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting food type.");
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFoodType(int id, [FromBody] FoodTypeDto updatedFoodType)
        {
            if (updatedFoodType == null || string.IsNullOrWhiteSpace(updatedFoodType.NameType))
            {
                return BadRequest("Invalid food type data.");
            }

            try
            {
                // Tìm FoodType theo id
                var foodType = await _context.FoodTypes.FindAsync(id);
                var parent=await _context.FoodTypes.FindAsync(updatedFoodType.ParentId);
                // Nếu không tìm thấy loại món ăn
                if (foodType == null)
                {
                    return NotFound("Food type not found.");
                }
                if(parent!=null && parent.ParentId!=0)
                {
                    return Ok(new { status = "error", message = "Parent type is a child type." });
                }

                // Cập nhật thông tin
                foodType.NameType = updatedFoodType.NameType;
                foodType.ParentId = updatedFoodType.ParentId;

                // Lưu thay đổi vào cơ sở dữ liệu
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "success",
                    data = new { foodType.TypeId, foodType.NameType, foodType.ParentId }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating food type.");
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }

        public class FoodTypeDto
        {
            public string NameType { get; set; }
            public int ParentId { get; set; }

        }
    }
}
