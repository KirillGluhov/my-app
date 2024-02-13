﻿using KeyTracingAPI.Models.UserModels;
using Microsoft.EntityFrameworkCore;

namespace KeyTracingAPI.Models
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Token> BanedTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
