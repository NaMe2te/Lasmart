using DataAccess.DBContexts;
using DataAccess.Entities;
using DataAccess.Repositories;
using DataAccess.Repositories.EfRepositories;
using DataAccess.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccess.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddDatabaseContext(this IServiceCollection collection, Action<DbContextOptionsBuilder> configuration)
    {
        collection.AddDbContext<DatabaseContext>(configuration);
        return collection;
    }

    public static IServiceCollection AddDataAccess(this IServiceCollection collection)
    {
        collection.AddScoped<IUnitOfWork, UnitOfWork<DatabaseContext>>();
        collection.AddScoped<IBaseRepository<Comment>, CommentEfRepository>();
        collection.AddScoped<IBaseRepository<Point>, PointEfRepository>();
        return collection;
    }
}