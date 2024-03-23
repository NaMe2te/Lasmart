using System.Text.Json;

namespace API.Models;

public class ExceptionModel
{
    public ExceptionModel(int code, string message)
    {
        Code = code;
        Message = message;
    }

    public int Code { get; set; }
    public string Message { get; set; }
    
    public override string ToString()
    {
        return JsonSerializer.Serialize(this);
    }
}