using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
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
            {
                
                return BadRequest("Invalid bill data.");
            }

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Parse foodInfo
                var foodInfoList = JsonSerializer.Deserialize<List<OrderInfo>>(body.foodInfo);
                var orderIds = foodInfoList.Select(f => f.orderId).ToList();
             
                // Find orders to delete
                var ordersToDelete = await _context.UserFoodOrders
                    .Where(ufo => orderIds.Contains(ufo.OrderId))
                    .ToListAsync();

                // Remove orders
                _context.UserFoodOrders.RemoveRange(ordersToDelete);

                // Create new bill
                var newBill = new Bill
                {
                    TotalPrice = body.totalPrice,
                    Address = body.address,
                    FoodInfo = body.foodInfo,
                    UserId = body.userId,
                    Date = DateTime.UtcNow,
                    Status = "Pending"
                };
                // Save to database
                _context.Bills.Add(newBill);
                await _context.SaveChangesAsync();
                

                // Create a notification for the user
                await CreateNotificationAsync(
                    header: "Hóa đơn được chấp nhận",
                    content: $"Hóa đơn ID {newBill.BillId} đã được tạo.",
                    userId: body.userId
                );

                await transaction.CommitAsync();  
                return CreatedAtAction(nameof(AddBill), new { id = newBill.BillId }, newBill);
            }
            catch (JsonException jsonEx)
            {
                await transaction.RollbackAsync();
                _logger.LogError(jsonEx, "Error deserializing foodInfo JSON: {Message}", jsonEx.Message);
                return StatusCode(500, "Error processing food information");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Error processing bill: {Message}", ex.Message);
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
                .OrderByDescending(b => b.Date)
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
        public class OrderInfo
        {
            public int orderId { get; set; }
            public int foodId { get; set; }
            public int quantity { get; set; }
            public string note { get; set; }
            public FoodDetails foodDetails { get; set; }
        }
        public class FoodDetails
        {
            public int typeId { get; set; }
            public string name { get; set; }
            public string description { get; set; }
            public string image1 { get; set; }
            public decimal price { get; set; }
        }

        [HttpGet("getCompleted")]
        public async Task<IActionResult> GetBillCompleted()
        {
            try
            {
                var bills = await _context.Bills.AsQueryable().Where(f => f.Status == "Completed").ToListAsync();
                foreach (var bill in bills)
                {
                    bill.TotalPrice -= 12000;
                }
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
        
        [HttpPut("updateStatus")]
        public async Task<IActionResult> UpdateStatusBill(int Id, string status)
        {

            try
            {
                var bill = await _context.Bills.FindAsync(Id);
                if (bill == null)
                {
                    return NotFound(new { status = "error", message = "Bill not found." });
                }
                else
                {
                    bill.Status = status;
                }
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "success",
                    data = new { bill.BillId, bill.Status }
                });
            }
            catch (Exception)
            {
                return BadRequest(new { status = "error", message = "Error" });
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> UpdateStatusBill(int Id)
        {

            try
            {
                var bill = await _context.Bills.FindAsync(Id);
                if (bill == null)
                {
                    return NotFound(new { status = "error", message = "Bill not found." });
                }
                else
                {
                    _context.Bills.Remove(bill);
                }
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "success",
                });
            }
            catch (Exception)
            {
                return BadRequest(new { status = "error", message = "Error" });
            }
        }

        [HttpGet("getForManageCustomer")]
        public async Task<IActionResult> GetForManageCustomer()
        {
           try
            {
                // Lấy tất cả người dùng
                var users = await _context.Users
                    .Select(u => new 
                    {
                        u.UserId,
                        u.Username,
                        u.Email
                    })
                    .ToListAsync();

                // Lấy tất cả hóa đơn đã hoàn thành
                var bills = await _context.Bills
                    .AsQueryable()
                    .Where(f => f.Status == "Completed")
                    .ToListAsync();
                foreach (var bill in bills)
                {
                    bill.TotalPrice -= 12000;
                }
                // Kết hợp thông tin hóa đơn với thông tin người dùng
                var result = users.Select(u => new
                {
                    userId = u.UserId,
                    username = u.Username,
                    email = u.Email,
                    totalSpend = bills.Where(b => b.UserId == u.UserId).Sum(b => b.TotalPrice), // Tính tổng tiền
                    totalQuantity = bills.Where(b => b.UserId == u.UserId).Sum(b => b.FoodInfo != null ? JsonSerializer.Deserialize<List<OrderInfo>>(b.FoodInfo).Sum(f => f.quantity) : 0) // Tính tổng số lượng sản phẩm
                }).ToList();

                return Ok(new
                {
                    status = "success",
                    data = result,
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
        private async Task CreateNotificationAsync(string header, string content, int userId)
        {
            var notification = new Noti
            {
                Header = header,
                Content = content,
                Date = DateTime.UtcNow,
                UserId = userId
            };

            _context.Notis.Add(notification);
            await _context.SaveChangesAsync();
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
