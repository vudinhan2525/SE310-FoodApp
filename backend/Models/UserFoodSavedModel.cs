namespace backend.Controllers
{
    public class UserFoodSaved
{
    public int UserId { get; set; }  // Foreign Key
    public int FoodId { get; set; }  // Foreign Key

    // Composite Primary Key is handled via Fluent API
    public User User { get; set; }  // FK relationship
    public Food Food { get; set; }  // FK relationship
}

}