using DataAccess.Entities.BaseEntities;

namespace DataAccess.Entities;

public class Point : BaseEntity
{
    public Point(float x, float y, float radius, string color)
    {
        X = x;
        Y = y;
        Radius = radius;
        Color = color;
        Comments = new List<Comment>();
    }
    
    protected Point() { }

    public float X { get; set; }
    public float Y { get; set; }
    public float Radius { get; set; }
    public string Color { get; set; }
    public virtual ICollection<Comment> Comments { get; set; }
}