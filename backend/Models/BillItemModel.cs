namespace backend.Controllers
{
    public class BillItem
    {
        public int ItemId { get; set; }  // Primary Key
        public int BillId { get; set; }  // Foreign Key
        public long Price { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }

        // Navigation properties
        public Bill Bill { get; set; }  // FK relationship
    }
}