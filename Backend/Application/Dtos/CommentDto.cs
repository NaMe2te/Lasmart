namespace Application.Dtos;

public class CommentDto
{
    public CommentDto() { }
    
    public Guid Id { get; set; }
    public string Text { get; set; }
    public string Color { get; set; }
    public Guid PointId { get; set; }
}