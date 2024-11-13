namespace backend.Controllers
{
    public class FoodType
    {
        public int TypeId { get; set; } 
        public string NameType { get; set; }
        public int ParentId { get; set; }

        // Navigation properties
        public ICollection<Food> Foods { get; set; }
    }
}