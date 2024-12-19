namespace backend.Controllers
{
    public class User
    {
        public int UserId { get; set; }  
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }

        public ICollection<Rating> Ratings { get; set; }
        public ICollection<UserFoodOrder> Orders { get; set; }
        public ICollection<UserFoodSaved> SavedFoods { get; set; }
        public ICollection<Bill> Bills { get; set; }
    }

}