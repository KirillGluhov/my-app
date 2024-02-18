using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KeyTracingAPI.Migrations
{
    /// <inheritdoc />
    public partial class _11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Key",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Auditory = table.Column<string>(type: "text", nullable: false),
                    IsInPrincipalOffice = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Key", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    NormalizedName = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    UserRole = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BookingKeyRequest",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    KeyId = table.Column<Guid>(type: "uuid", nullable: false),
                    DateToBeBooked = table.Column<DateOnly>(type: "date", nullable: false),
                    BookingDateTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TimeSlot = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    RequestStatus = table.Column<int>(type: "integer", nullable: false),
                    IsKeyRecieved = table.Column<bool>(type: "boolean", nullable: false),
                    IsKeyReturned = table.Column<bool>(type: "boolean", nullable: false),
                    IsRepetitive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingKeyRequest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookingKeyRequest_Key_KeyId",
                        column: x => x.KeyId,
                        principalTable: "Key",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookingKeyRequest_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tokens",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    RefreshToken = table.Column<string>(type: "text", nullable: false),
                    AccessToken = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tokens", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Tokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BookedKeys",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    KeyId = table.Column<Guid>(type: "uuid", nullable: false),
                    DateToBeBooked = table.Column<DateOnly>(type: "date", nullable: false),
                    TimeSlot = table.Column<int>(type: "integer", nullable: false),
                    RequestId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookedKeys", x => new { x.UserId, x.KeyId, x.DateToBeBooked, x.TimeSlot });
                    table.ForeignKey(
                        name: "FK_BookedKeys_BookingKeyRequest_RequestId",
                        column: x => x.RequestId,
                        principalTable: "BookingKeyRequest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KeySlotsRepetitiveRequest",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    KeyId = table.Column<Guid>(type: "uuid", nullable: false),
                    TimeSlot = table.Column<int>(type: "integer", nullable: false),
                    RequestId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KeySlotsRepetitiveRequest", x => new { x.UserId, x.KeyId, x.TimeSlot });
                    table.ForeignKey(
                        name: "FK_KeySlotsRepetitiveRequest_BookingKeyRequest_RequestId",
                        column: x => x.RequestId,
                        principalTable: "BookingKeyRequest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookedKeys_RequestId",
                table: "BookedKeys",
                column: "RequestId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BookingKeyRequest_KeyId",
                table: "BookingKeyRequest",
                column: "KeyId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingKeyRequest_UserId",
                table: "BookingKeyRequest",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_KeySlotsRepetitiveRequest_RequestId",
                table: "KeySlotsRepetitiveRequest",
                column: "RequestId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookedKeys");

            migrationBuilder.DropTable(
                name: "KeySlotsRepetitiveRequest");

            migrationBuilder.DropTable(
                name: "Tokens");

            migrationBuilder.DropTable(
                name: "BookingKeyRequest");

            migrationBuilder.DropTable(
                name: "Key");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
