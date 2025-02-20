using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class SeedSuperpoderes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Superpoderes",
                columns: ["Id", "Superpoder", "Descricao"],
                values: new object[,]
                {
                    { 1, "Super Força", "Capacidade de exercer força muito além dos limites humanos" },
                    { 2, "Voo", "Habilidade de voar e levitar" },
                    { 3, "Invisibilidade", "Poder de ficar invisível aos olhos humanos" },
                    { 4, "Telepatia", "Capacidade de ler e controlar mentes" },
                    { 5, "Super Velocidade", "Velocidade sobre-humana em movimento" },
                    { 6, "Regeneração", "Cura acelerada e regeneração de ferimentos" },
                    { 7, "Visão de Raio-X", "Capacidade de ver através de objetos sólidos" },
                    { 8, "Controle Elemental", "Manipulação de elementos naturais" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Superpoderes",
                keyColumn: "Id",
                keyValues: [1, 2, 3, 4, 5, 6, 7, 8]);
        }
    }
}
