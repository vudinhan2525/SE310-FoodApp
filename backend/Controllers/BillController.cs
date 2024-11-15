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
    public class BillController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly ILogger<UserController> _logger;
        public BillController(AppDbContext context, ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }
        [HttpPost("addBill")]
        public async Task<IActionResult> AddBill([FromBody] BillBodyDto body)
        {
            if (body == null)
                return BadRequest("Invalid bill data.");

            // Create a new Bill instance with data from the DTO
            var newBill = new Bill
            {
                TotalPrice = body.totalPrice,
                Address = body.address,
                FoodInfo = body.foodInfo,
                UserId = body.userId,
                Date = DateTime.UtcNow, // Set the date to the current UTC date and time
                Status = "Pending"      // Set an initial status
            };

            try
            {
                // Add and save the new bill to the database
                _context.Bills.Add(newBill);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(AddBill), new { id = newBill.BillId }, newBill);
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetBillByUserId(int page, int limit, int userId)
        {
            // Calculate the skip value for pagination
            int skip = (page - 1) * limit;

            // Fetch the bills for the specific user, applying pagination
            var bills = await _context.Bills
                .Where(b => b.UserId == userId)  // Filter by userId
                .Skip(skip)                     // Skip records for pagination
                .Take(limit)                    // Take the required number of records
                .ToListAsync();                 // Execute the query asynchronously

            // Get the total number of bills for the user (for pagination purposes)
            var totalBills = await _context.Bills
                .Where(b => b.UserId == userId)
                .CountAsync();

            // Calculate the total number of pages
            int totalPages = (int)Math.Ceiling((double)totalBills / limit);

            // Return the paginated result along with additional info
            return Ok(new
            {
                status = "success",
                data = bills,  // The bills data
                pagination = new
                {
                    currentPage = page,    // Current page number
                    pageSize = limit,      // Number of items per page
                    totalItems = totalBills, // Total number of bills
                    totalPages = totalPages // Total number of pages
                }
            });
        }
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllBill()
        {
            try
            {
                var bills = await _context.Bills.ToListAsync();
                
                return Ok(new
                {
                    status = "success",
                    data = bills,
                });
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    status = "Error",
                });
            }

        }

        [HttpGet("getCompleted")]
        public async Task<IActionResult> GetBillCompleted()
        {
            try
            {
                var bills = await _context.Bills.AsQueryable().Where(f => f.Status == "Completed").ToListAsync();
                
                return Ok(new
                {
                    status = "success",
                    data = bills,
                });
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    status = "Error",
                });
            }

        }
        
        public class BillBodyDto
        {
            public long totalPrice { get; set; }
            public string address { get; set; }
            public string foodInfo { get; set; }
            public int userId { get; set; }
        }
    }
}
