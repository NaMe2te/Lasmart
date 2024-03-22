using DataAccess.Entities.BaseEntities;

namespace DataAccess.Entities;

public class Comment : BaseEntity
{
    public Comment(string text, string color, Guid pointId)
    {
        Text = text;
        Color = color;
        PointId = pointId;
    }
    
    protected Comment() { }

    public string Text { get; set; }
    public string Color { get; set; }
    public Guid PointId { get; set; }
    public virtual Point Point { get; set; }
}