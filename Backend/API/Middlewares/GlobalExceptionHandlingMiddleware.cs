using System.Net;
using API.Models;

namespace API.Middlewares;

public class GlobalExceptionHandlingMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception e)
        {
            await HandleExceptionAsync(context, e);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        ExceptionModel error = exception switch
        {
            ArgumentNullException e => new ExceptionModel((int) HttpStatusCode.BadRequest, e.Message),
            _ => new ExceptionModel((int) HttpStatusCode.InternalServerError, "Internal Server Error")
        };

        context.Response.StatusCode = error.Code;
        await context.Response.WriteAsync(error.ToString());
    }
}