using KeyTracingAPI.Models.Entities;
using KeyTracingAPI.Models.ManyToMany;
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
        public DbSet<BookingKeyRequest> BookingKeyRequest { get; set; }
        public DbSet<BookedKey> BookedKeys { get; set; }
        public DbSet<Key> Key { get; set; }
        public DbSet<KeySlotsRepetitiveRequest> keySlotsRepetitiveRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Key>()
                .HasKey(k => k.Id);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Token>()
                .HasOne(t => t.User)
                .WithOne(u => u.UserToken)
                .HasForeignKey<Token>(t => t.UserId)
                .IsRequired();

            modelBuilder.Entity<BookedKey>()
                .HasKey(BK => new {BK.UserId, BK.KeyId, BK.DateToBeBooked, BK.TimeSlot});

            modelBuilder.Entity<BookingKeyRequest>()
                .HasOne(BKR => BKR.BookedKeyInstance)
                .WithOne(BKI => BKI.BookingKeyRequest)
                .HasForeignKey<BookedKey>(BKI => BKI.RequestId)
                .IsRequired();

            modelBuilder.Entity<KeySlotsRepetitiveRequest>().HasKey(BK => new { BK.UserId, BK.KeyId, BK.TimeSlot });

            //ne uveren kak pravilno, dolzno bit mnogie ko mnogim
            modelBuilder.Entity<BookingKeyRequest>()
                .HasOne(BKR => BKR.User)
                .WithMany(u => u.UserSlots)
                .HasForeignKey(BKR => BKR.UserId)
                .IsRequired();
            modelBuilder.Entity<BookingKeyRequest>()
                .HasOne(BKR => BKR.Key)
                .WithMany(k => k.KeySlots)
                .HasForeignKey(BKR => BKR.KeyId)
                .IsRequired();
        }
    }
}
