using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KeyTracingAPI.Migrations
{
    /// <inheritdoc />
    public partial class last : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_KeySlotsRepetitiveRequest",
                table: "KeySlotsRepetitiveRequest");

            migrationBuilder.RenameTable(
                name: "KeySlotsRepetitiveRequest",
                newName: "keySlotsRepetitiveRequests");

            migrationBuilder.AddPrimaryKey(
                name: "PK_keySlotsRepetitiveRequests",
                table: "keySlotsRepetitiveRequests",
                columns: new[] { "UserId", "KeyId", "TimeSlot" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_keySlotsRepetitiveRequests",
                table: "keySlotsRepetitiveRequests");

            migrationBuilder.RenameTable(
                name: "keySlotsRepetitiveRequests",
                newName: "KeySlotsRepetitiveRequest");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KeySlotsRepetitiveRequest",
                table: "KeySlotsRepetitiveRequest",
                columns: new[] { "UserId", "KeyId", "TimeSlot" });
        }
    }
}
