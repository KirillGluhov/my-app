using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.WideUseModels;

//using KeyTracingAPI.Models.UserModels;
using Microsoft.EntityFrameworkCore;

namespace KeyTracingAPI.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Token> Tokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*разделить по сущностям*/
            modelBuilder.Entity<Key>().HasKey(k => new { k.Id, k.Building});

            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();

            modelBuilder.Entity<Token>().HasOne(t => t.User).WithOne(u => u.UserToken).HasForeignKey<Token>(t => t.UserId).IsRequired();
        }
    }
}
