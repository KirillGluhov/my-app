using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KeyTracingAPI.Migrations
{
    /// <inheritdoc />
    public partial class keys_repetitiveRequests_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingKeyRequest_Key_KeyId",
                table: "BookingKeyRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_KeySlotsRepetitiveRequest_BookingKeyRequest_RequestId",
                table: "KeySlotsRepetitiveRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KeySlotsRepetitiveRequest",
                table: "KeySlotsRepetitiveRequest");

            migrationBuilder.DropIndex(
                name: "IX_KeySlotsRepetitiveRequest_RequestId",
                table: "KeySlotsRepetitiveRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Key",
                table: "Key");

            migrationBuilder.DropColumn(
                name: "RequestId",
                table: "KeySlotsRepetitiveRequest");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<Guid>(
                name: "RequestId",
                table: "KeySlotsRepetitiveRequest",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_KeySlotsRepetitiveRequest",
                table: "KeySlotsRepetitiveRequest",
                columns: new[] { "UserId", "KeyId", "TimeSlot" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Key",
                table: "Key",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_KeySlotsRepetitiveRequest_RequestId",
                table: "KeySlotsRepetitiveRequest",
                column: "RequestId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BookingKeyRequest_Key_KeyId",
                table: "BookingKeyRequest",
                column: "KeyId",
                principalTable: "Key",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KeySlotsRepetitiveRequest_BookingKeyRequest_RequestId",
                table: "KeySlotsRepetitiveRequest",
                column: "RequestId",
                principalTable: "BookingKeyRequest",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
