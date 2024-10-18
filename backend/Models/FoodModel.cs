namespace backend.Controllers
{
    public class Food
    {
        public int FoodId { get; set; }  // Primary Key
        public string Name { get; set; }
        public string Image { get; set; }
        public int TypeId { get; set; }  // Foreign Key
        public string Rating { get; set; }
        public decimal NumberRating { get; set; }
        public long Price { get; set; }
        public bool Available { get; set; }

        // Navigation properties
        public FoodType FoodType { get; set; }  // FK relationship
        public ICollection<Rating> Ratings { get; set; }
        public ICollection<UserFoodOrder> Orders { get; set; }
        public ICollection<UserFoodSaved> SavedUsers { get; set; }
    }
}