namespace backend.Controllers
{
    public class Rating
    {
        public int RatingId { get; set; }  // Primary Key
        public int UserId { get; set; }  // Foreign Key
        public int FoodId { get; set; }  // Foreign Key
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public decimal RatingValue { get; set; }
        public string? Reply { get; set; }
        public DateTime? DateReply { get; set; }

        public User User { get; set; } 
        public Food Food { get; set; }
    }
}