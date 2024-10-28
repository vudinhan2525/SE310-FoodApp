using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class updateRating2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Foods_FoodTypes_FoodTypeTypeId",
                table: "Foods");

            migrationBuilder.DropIndex(
                name: "IX_Foods_FoodTypeTypeId",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "FoodTypeTypeId",
                table: "Foods");

            migrationBuilder.CreateIndex(
                name: "IX_Foods_TypeId",
                table: "Foods",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Foods_FoodTypes_TypeId",
                table: "Foods",
                column: "TypeId",
                principalTable: "FoodTypes",
                principalColumn: "TypeId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Foods_FoodTypes_TypeId",
                table: "Foods");

            migrationBuilder.DropIndex(
                name: "IX_Foods_TypeId",
                table: "Foods");

            migrationBuilder.AddColumn<int>(
                name: "FoodTypeTypeId",
                table: "Foods",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Foods_FoodTypeTypeId",
                table: "Foods",
                column: "FoodTypeTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Foods_FoodTypes_FoodTypeTypeId",
                table: "Foods",
                column: "FoodTypeTypeId",
                principalTable: "FoodTypes",
                principalColumn: "TypeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
