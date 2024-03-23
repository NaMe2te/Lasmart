namespace Application.Dtos;

public class PointDto
{
    public PointDto() { }
    
    public Guid Id { get; set; }
    public float X { get; set; }
    public float Y { get; set; }
    public float Radius { get; set; }
    public string Color { get; set; }
    public ICollection<CommentDto> Comments { get; set; }
}