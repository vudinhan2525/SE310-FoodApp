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
                var foodInfoList = JsonSerializer.Deserialize<List<OrderInfo>>(body.foodInfo);

                if (foodInfoList == null || !foodInfoList.Any())
                {
                    return BadRequest("No food items provided.");
                }

                // Loop through each food item and update its quantity
                foreach (var order in foodInfoList)
                {
                    var food = await _context.Foods.FindAsync(order.foodId);
                    if (food == null)
                    {
                        await transaction.RollbackAsync();
                        return BadRequest($"Food with ID {order.foodId} does not exist.");
                    }

                    if (food.Itemleft < order.quantity)
                    {
                        await transaction.RollbackAsync();
                        return BadRequest($"Not enough quantity for food ID {order.foodId}. Available: {food.Itemleft}");
                    }

                    // Subtract the ordered quantity from the available quantity
                    food.Itemleft -= order.quantity;

                    // Update the food record
                    _context.Foods.Update(food);
                }
                var orderIds = foodInfoList.Select(f => f.orderId).ToList();
                var ordersToDelete = await _context.UserFoodOrders
                    .Where(ufo => orderIds.Contains(ufo.OrderId))
                    .ToListAsync();

                _context.UserFoodOrders.RemoveRange(ordersToDelete);

                var newBill = new Bill
                {
                    TotalPrice = body.totalPrice,
                    Address = body.address,
                    FoodInfo = body.foodInfo,
                    UserId = body.userId,
                    Date = DateTime.UtcNow,
                    Status = "Pending"
                };
                _context.Bills.Add(newBill);
                await _context.SaveChangesAsync();
                

                await CreateNotificationAsync(
                    header: "Đơn hàng được chấp nhận",
                    content: $"Đơn hàng #{newBill.BillId} đã được tạo.",
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
            int skip = (page - 1) * limit;

            var bills = await _context.Bills
                .Where(b => b.UserId == userId)  
                .OrderByDescending(b => b.Date)
                .Skip(skip)                     
                .Take(limit)                    
                .ToListAsync();                 

            
            var totalBills = await _context.Bills
                .Where(b => b.UserId == userId)
                .CountAsync();

            
            int totalPages = (int)Math.Ceiling((double)totalBills / limit);

            
            return Ok(new
            {
                status = "success",
                data = bills,  
                pagination = new
                {
                    currentPage = page,    
                    pageSize = limit,      
                    totalItems = totalBills, 
                    totalPages = totalPages 
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
                
                
                string header = "Đơn hàng được cập nhật";
                string content = "";

                if(status == "Failed"){
                    content  = $"Đơn hàng #{bill.BillId} đã bị từ chối.";
                }
                if(status == "Pending"){
                    content  = $"Đơn hàng #{bill.BillId} đang chờ được duyệt.";
                }

                if(status == "Ongoing"){
                    content  = $"Đơn hàng #{bill.BillId} đang được giao.";
                }
                if(status == "Completed"){
                    content  = $"Đơn hàng #{bill.BillId} được thanh toán thành công.";
                }
                await CreateNotificationAsync(header, content, bill.UserId);
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
        public async Task<IActionResult> DeleteBill(int Id)
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
                
                var users = await _context.Users
                    .Select(u => new 
                    {
                        u.UserId,
                        u.Username,
                        u.Email
                    })
                    .ToListAsync();

                
                var bills = await _context.Bills
                    .AsQueryable()
                    .Where(f => f.Status == "Completed")
                    .ToListAsync();
                foreach (var bill in bills)
                {
                    bill.TotalPrice -= 12000;
                }
               
                var result = users.Select(u => new
                {
                    userId = u.UserId,
                    username = u.Username,
                    email = u.Email,
                    totalSpend = bills.Where(b => b.UserId == u.UserId).Sum(b => b.TotalPrice), 
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
