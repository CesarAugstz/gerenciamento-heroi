using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Herois> Herois { get; set; } = null!;
    public DbSet<Superpoderes> Superpoderes { get; set; } = null!;
    public DbSet<HeroisSuperpoderes> HeroisSuperpoderes { get; set; } = null!;
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<HeroisSuperpoderes>()
            .HasOne(hs => hs.Heroi)
            .WithMany(h => h.HeroisSuperpoderes)
            .HasForeignKey(hs => hs.HeroiId);

        modelBuilder.Entity<HeroisSuperpoderes>()
            .HasOne(hs => hs.Superpoder)
            .WithMany(s => s.HeroisSuperpoderes)
            .HasForeignKey(hs => hs.SuperpoderId);

        base.OnModelCreating(modelBuilder);
    }
}