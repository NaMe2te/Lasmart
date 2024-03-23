using API.Middlewares;

namespace API.Extensions;

public static class WiddlewareExtension
{
    public static IServiceCollection AddCustomMiddlewares(this IServiceCollection collection)
    {
        collection.AddTransient<GlobalExceptionHandlingMiddleware>();
        return collection;
    }

    public static IApplicationBuilder UseGlobalExceptionHandlingMiddleware(this IApplicationBuilder builder)
    {
        builder.UseMiddleware<GlobalExceptionHandlingMiddleware>();
        return builder;
    }
}