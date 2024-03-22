using Microsoft.EntityFrameworkCore.Storage;

namespace DataAccess.UnitOfWork;

public interface IUnitOfWork : IDisposable
{
    IDbContextTransaction BeginTransaction();
    Task<int> SaveChangesAsync();
    int SaveChanges();
}