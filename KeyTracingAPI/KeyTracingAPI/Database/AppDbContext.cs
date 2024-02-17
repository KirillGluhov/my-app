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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*разделить по сущностям*/
            modelBuilder.Entity<Key>()
                //.HasKey(k => new { k.Id, k.Building}); ?
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


            //ne uveren kak pravilno 
            modelBuilder.Entity<KeySlotsRepetitiveRequest>()
                .HasKey(KSRR => new { KSRR.UserId, KSRR.KeyId, KSRR.TimeSlot });
            modelBuilder.Entity<KeySlotsRepetitiveRequest>()
                .HasOne(KSRR => KSRR.User)
                .WithMany(u => u.UserKeySlots)
                .HasForeignKey(KSRR => KSRR.UserId);
            modelBuilder.Entity<KeySlotsRepetitiveRequest>()
                .HasOne(KSRR => KSRR.Key)
                .WithMany(k => k.KeyKeySlots)
                .HasForeignKey(KSRR => KSRR.KeyId);
        }
    }
}
