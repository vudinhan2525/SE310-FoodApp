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
    public class CartController : ControllerBase
    {   

        private readonly AppDbContext _context;
        private readonly ILogger<UserController> _logger;
        public CartController(AppDbContext context, ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }
       [HttpPost("addQuantity")]
        public async Task<IActionResult> AddQuantity([FromBody] CartRequest request)
        {
            try
            {
                // Find the UserFoodOrder entry by orderId
                var order = await _context.UserFoodOrders.FirstOrDefaultAsync(o => o.OrderId == request.orderId);

                if (order == null)
                {
                    return NotFound("Order not found.");
                }

                // Increment the quantity
                order.Quantity += 1;

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok(new
                {   
                    status = "success",
                    message = "Quantity increased successfully.",
                    orderId = order.OrderId,
                    newQuantity = order.Quantity
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }
        public class CartRequest
        {
            public int orderId { get; set; }
        }
       
        [HttpPost("subQuantity")]
        public async Task<IActionResult> SubQuantity([FromBody] CartRequest request)
        {
            try
            {
                // Find the UserFoodOrder entry by orderId
                var order = await _context.UserFoodOrders.FirstOrDefaultAsync(o => o.OrderId == request.orderId);

                if (order == null)
                {
                    return NotFound("Order not found.");
                }

                // Decrement the quantity, ensuring it does not go below 1
                if (order.Quantity > 1)
                {
                    order.Quantity -= 1;
                }
                else
                {
                    return BadRequest("Quantity cannot be less than 1.");
                }

                // Save changes to the database
                await _context.SaveChangesAsync();

                return Ok(new
                {   
                    status = "success",
                    message = "Quantity decreased successfully.",
                    orderId = order.OrderId,
                    newQuantity = order.Quantity
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }
        [HttpPost("deleteCart")]
        public async Task<IActionResult> DeleteCart([FromBody] CartRequest request)
        {
            try
            {
                // Find the UserFoodOrder entry by orderId
                var order = await _context.UserFoodOrders.FirstOrDefaultAsync(o => o.OrderId == request.orderId);

                if (order == null)
                {
                    return NotFound("Order not found.");
                }

                _context.UserFoodOrders.Remove(order);

                await _context.SaveChangesAsync();

                return Ok(new
                {   
                    status = "success",
                    message = "Order deleted successfully.",
                    orderId = order.OrderId
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }
        [HttpPost("addCart")]
        public async Task<IActionResult> AddCart([FromBody] CartBodyDto body)
        {
            try
            {
                // Validate the request data
                if (body.userId <= 0 || body.foodId <= 0 || body.quantity <= 0)
                {
                    return BadRequest("Invalid input data.");
                }

                // Check if the UserFoodOrder entry already exists
                var existingOrder = await _context.UserFoodOrders
                    .FirstOrDefaultAsync(o => o.UserId == body.userId && o.FoodId == body.foodId);

                if (existingOrder != null)
                {
                    // If it exists, update the quantity
                    existingOrder.Quantity += body.quantity;
                    await _context.SaveChangesAsync();

                    return Ok(new
                    {
                        status = "success",
                        message = "Cart item quantity updated successfully.",
                        orderId = existingOrder.OrderId,
                        newQuantity = existingOrder.Quantity
                    });
                }
                else
                {
                    // Create a new UserFoodOrder
                    var order = new UserFoodOrder
                    {
                        UserId = body.userId,
                        FoodId = body.foodId,
                        Quantity = body.quantity,
                        Note = body.note
                    };

                    // Add the new order to the context
                    await _context.UserFoodOrders.AddAsync(order);

                    // Save changes to the database
                    await _context.SaveChangesAsync();

                    return Ok(new
                    {
                        status = "success",
                        message = "Cart item added successfully.",
                        orderId = order.OrderId
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }

 
        public class CartBodyDto
        {
            public int userId { get; set; }
            public int foodId { get; set; }
            public int quantity { get; set; }
            public string note { get; set; }
        }
    }
}
