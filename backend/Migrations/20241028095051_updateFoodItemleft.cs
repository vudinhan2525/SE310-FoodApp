using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class updateFoodItemleft : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Available",
                table: "Foods");

            migrationBuilder.AddColumn<int>(
                name: "Itemleft",
                table: "Foods",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Itemleft",
                table: "Foods");

            migrationBuilder.AddColumn<bool>(
                name: "Available",
                table: "Foods",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }
    }
}
