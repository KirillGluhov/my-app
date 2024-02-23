using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KeyTracingAPI.Migrations
{
    /// <inheritdoc />
    public partial class changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingKeyRequest_Keys_KeyId",
                table: "BookingKeyRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_keySlotsRepetitiveRequests",
                table: "keySlotsRepetitiveRequests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Keys",
                table: "Keys");

            migrationBuilder.RenameTable(
                name: "keySlotsRepetitiveRequests",
                newName: "KeySlotsRepetitiveRequest");

            migrationBuilder.RenameTable(
                name: "Keys",
                newName: "Key");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KeySlotsRepetitiveRequest",
                table: "KeySlotsRepetitiveRequest",
                columns: new[] { "UserId", "KeyId", "TimeSlot" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Key",
                table: "Key",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingKeyRequest_Key_KeyId",
                table: "BookingKeyRequest",
                column: "KeyId",
                principalTable: "Key",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingKeyRequest_Key_KeyId",
                table: "BookingKeyRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KeySlotsRepetitiveRequest",
                table: "KeySlotsRepetitiveRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Key",
                table: "Key");

            migrationBuilder.RenameTable(
                name: "KeySlotsRepetitiveRequest",
                newName: "keySlotsRepetitiveRequests");

            migrationBuilder.RenameTable(
                name: "Key",
                newName: "Keys");

            migrationBuilder.AddPrimaryKey(
                name: "PK_keySlotsRepetitiveRequests",
                table: "keySlotsRepetitiveRequests",
                columns: new[] { "UserId", "KeyId", "TimeSlot" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Keys",
                table: "Keys",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingKeyRequest_Keys_KeyId",
                table: "BookingKeyRequest",
                column: "KeyId",
                principalTable: "Keys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
