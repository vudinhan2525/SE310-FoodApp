namespace backend.Controllers
{
    public class Noti
    {
        public int NotiId { get; set; } 
        public string Header { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }  
    }
}