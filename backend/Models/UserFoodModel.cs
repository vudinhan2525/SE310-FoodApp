namespace backend.Controllers
{
    public class UserFoodOrder
{
    public int OrderId { get; set; }  // Primary Key
    public int UserId { get; set; }  // Foreign Key
    public int FoodId { get; set; }  // Foreign Key
    public int Quantity { get; set; }
    public string? Note { get; set; }

    // Navigation properties
    public User User { get; set; }  // FK relationship
    public Food Food { get; set; }  // FK relationship
}

}