namespace backend.Controllers
{
    public class FoodType
    {
        public int TypeId { get; set; } 
        public string NameType { get; set; }
        public int ParentId { get; set; }


        public ICollection<Food> Foods { get; set; }
    }
}