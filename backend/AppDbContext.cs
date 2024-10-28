using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<FoodType> FoodTypes { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<UserFoodOrder> UserFoodOrders { get; set; }
        public DbSet<UserFoodSaved> UserFoodSaved { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillItem> BillItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserFoodSaved>()
                .HasKey(ufs => new { ufs.UserId, ufs.FoodId });
            modelBuilder.Entity<BillItem>()
                .HasKey(bi => bi.ItemId);
            modelBuilder.Entity<FoodType>().HasKey(ft => ft.TypeId);
             modelBuilder.Entity<UserFoodOrder>().HasKey(userOrder => userOrder.OrderId);

              modelBuilder.Entity<Food>()
                .HasOne(f => f.FoodType)
                .WithMany(ft => ft.Foods)
                .HasForeignKey(f => f.TypeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
