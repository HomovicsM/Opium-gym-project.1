using Microsoft.EntityFrameworkCore;
using gymproject1.Models;


namespace gymproject1.Data
{
    public class MerchDbContext : DbContext
    {
        public MerchDbContext(DbContextOptions<MerchDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
    }
}
