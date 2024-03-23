using Application.Extensions;
using DataAccess.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabaseContext(b => b.UseLazyLoadingProxies()
    .UseInMemoryDatabase("lasmart"));

builder.Services
    .AddApplication()
    .AddDataAccess();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
