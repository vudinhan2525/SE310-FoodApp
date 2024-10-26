namespace backend.Controllers
{
    public class Bill
    {
        public int BillId { get; set; }  // Primary Key
        public DateTime Date { get; set; }
        public long TotalPrice { get; set; }
        public int UserId { get; set; }  // Foreign Key
        public string Address { get; set; }

        // Navigation properties
        public User User { get; set; }  // FK relationship
        public ICollection<BillItem> BillItems { get; set; }
    }

}