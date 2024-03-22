using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.DBContexts.EntityConfigs;

public class CommentConfig : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.Property(c => c.Id).ValueGeneratedOnAdd();
        builder.Property(c => c.Color).IsRequired();
        builder.Property(c => c.Text).IsRequired();
        builder.Property(c => c.PointId).IsRequired();

        builder.HasOne<Point>(c => c.Point)
            .WithMany(p => p.Comments)
            .HasForeignKey(c => c.PointId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}