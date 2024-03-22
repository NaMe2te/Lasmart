using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.DBContexts.EntityConfigs;

public class PointConfig : IEntityTypeConfiguration<Point>
{
    public void Configure(EntityTypeBuilder<Point> builder)
    {
        builder.Property(p => p.Id).ValueGeneratedOnAdd();
        builder.Property(p => p.X).IsRequired();
        builder.Property(p => p.Y).IsRequired();
        builder.Property(p => p.Radius).IsRequired();
        builder.Property(p => p.Color).IsRequired();

        builder.HasMany<Comment>(p => p.Comments)
            .WithOne(c => c.Point)
            .HasForeignKey(c => c.PointId)
            .HasPrincipalKey(p => p.Id)
            .OnDelete(DeleteBehavior.Cascade);
    }
}