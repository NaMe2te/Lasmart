using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DBContexts;

public class DatabaseContext : DbContext
{
    public DbSet<Point> Points { get; set; }
    public DbSet<Comment> Comments { get; set; }
    
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DatabaseContext).Assembly);
    }
}