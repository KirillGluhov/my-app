﻿// <auto-generated />
using System;
using KeyTracingAPI.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace KeyTracingAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("KeyTracingAPI.Models.Entities.BookedKey", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("KeyId")
                        .HasColumnType("uuid");

                    b.Property<DateOnly>("DateToBeBooked")
                        .HasColumnType("date");

                    b.Property<int>("TimeSlot")
                        .HasColumnType("integer");

                    b.Property<Guid>("RequestId")
                        .HasColumnType("uuid");

                    b.HasKey("UserId", "KeyId", "DateToBeBooked", "TimeSlot");

                    b.HasIndex("RequestId")
                        .IsUnique();

                    b.ToTable("BookedKeys");
                });

            modelBuilder.Entity("KeyTracingAPI.Models.Entities.BookingKeyRequest", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("BookingDateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateOnly>("DateToBeBooked")
                        .HasColumnType("date");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsKeyRecieved")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsKeyReturned")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsRepetitive")
                        .HasColumnType("boolean");

                    b.Property<Guid>("KeyId")
                        .HasColumnType("uuid");

                    b.Property<int>("RequestStatus")
                        .HasColumnType("integer");

                    b.Property<int>("TimeSlot")
                        .HasColumnType("integer");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("KeyId");

                    b.HasIndex("UserId");

                    b.ToTable("BookingKeyRequest");
                });

            modelBuilder.Entity("KeyTracingAPI.Models.Entities.Key", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Auditory")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsInPrincipalOffice")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.ToTable("Key");
                });

            modelBuilder.Entity("KeyTracingAPI.Models.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("NormalizedName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserRole")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("KeyTracingAPI.Models.ManyToMany.KeySlotsRepetitiveRequest", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("KeyId")
                        .HasColumnType("uuid");

                    b.Property<int>("TimeSlot")
                        .HasColumnType("integer");

                    b.Property<Guid>("RequestId")
                        .HasColumnType("uuid");

                    b.HasKey("UserId", "KeyId", "TimeSlot");

                    b.HasIndex("RequestId")
                        .IsUnique();

                    b.ToTable("KeySlotsRepetitiveRequest");
                });

            modelBuilder.Entity("KeyTracingAPI.WideUseModels.Token", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<string>("AccessToken")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("UserId");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("KeyTracingAPI.Models.Entities.BookedKey", b =>
                {
                    b.HasOne("KeyTracingAPI.Models.Entities.BookingKeyRequest", "BookingKeyRequest")
                        .WithOne("BookedKeyInstance")
                        .HasForeignKey("KeyTracingAPI.Models.Entities.BookedKey", "RequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BookingKeyRequest");
                });

            modelBuilder.Entity("KeyTracingAPI.Models.Entities.BookingKeyRequest", b =>
                {
                    b.HasOne("KeyTracingAPI.Models.Entities.Key", "Key")
                        .WithMany("KeySlots")
                        .HasForeignKey("KeyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("KeyTracingAPI.Models.Entities.User", "User")
                        .WithMany("UserSlots")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Key");

                    b.Navigation("User");
                });

            modelBuilder.Entity("KeyTracingAPI.Models.ManyToMany.KeySlotsRepetitiveRequest", b =>
                {
                    b.HasOne("KeyTracingAPI.Models.Entities.BookingKeyRequest", "BookingKeyRequest")
                        .WithOne("RepetitiveRequestInstance")
                        .HasForeignKey("KeyTracingAPI.Models.ManyToMany.KeySlotsRepetitiveRequest", "RequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BookingKeyRequest");
                });

            modelBuilder.Entity("KeyTracingAPI.WideUseModels.Token", b =>
                {
                    b.HasOne("KeyTracingAPI.Models.Entities.User", "User")
                        .WithOne("UserToken")
                        .HasForeignKey("KeyTracingAPI.WideUseModels.Token", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("KeyTracingAPI.Models.Entities.BookingKeyRequest", b =>
                {
                    b.Navigation("BookedKeyInstance");

                    b.Navigation("RepetitiveRequestInstance");
                });

            modelBuilder.Entity("KeyTracingAPI.Models.Entities.Key", b =>
                {
                    b.Navigation("KeySlots");
                });

            modelBuilder.Entity("KeyTracingAPI.Models.Entities.User", b =>
                {
                    b.Navigation("UserSlots");

                    b.Navigation("UserToken");
                });
#pragma warning restore 612, 618
        }
    }
}
