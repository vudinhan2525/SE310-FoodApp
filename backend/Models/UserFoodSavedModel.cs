namespace backend.Controllers
{
    public class UserFoodSaved
{
    public int UserId { get; set; }  // Foreign Key
    public int FoodId { get; set; }  // Foreign Key


    public User User { get; set; }  
    public Food Food { get; set; }  
}

}