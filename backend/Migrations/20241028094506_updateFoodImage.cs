using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class updateFoodImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Foods",
                newName: "Image3");

            migrationBuilder.AddColumn<string>(
                name: "Image1",
                table: "Foods",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Image2",
                table: "Foods",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image1",
                table: "Foods");

            migrationBuilder.DropColumn(
                name: "Image2",
                table: "Foods");

            migrationBuilder.RenameColumn(
                name: "Image3",
                table: "Foods",
                newName: "Image");
        }
    }
}
