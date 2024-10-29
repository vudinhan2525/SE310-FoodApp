namespace backend.Controllers
{
    public class Rating
    {
        public int RatingId { get; set; }  // Primary Key
        public int UserId { get; set; }  // Foreign Key
        public int FoodId { get; set; }  // Foreign Key
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public string RatingValue { get; set; }
        public string? Reply { get; set; }
        public DateTime? DateReply { get; set; }

        // Navigation properties
        public User User { get; set; }  // FK relationship
        public Food Food { get; set; }  // FK relationship
    }
}