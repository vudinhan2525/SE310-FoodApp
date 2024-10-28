namespace backend.Controllers
{
    public class Food
    {
        public int FoodId { get; set; }  // Primary Key
        public string Name { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
        public int TypeId { get; set; }  // Foreign Key
        public decimal Rating { get; set; }
        public decimal NumberRating { get; set; }
        public long Price { get; set; }
        public int Itemleft { get; set; }

        // Navigation properties
        public FoodType FoodType { get; set; }  // FK relationship
        public ICollection<Rating> Ratings { get; set; }
        public ICollection<UserFoodOrder> Orders { get; set; }
        public ICollection<UserFoodSaved> SavedUsers { get; set; }
    }
}