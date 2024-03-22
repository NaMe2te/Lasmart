using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace DataAccess.UnitOfWork;

public class UnitOfWork<TContext> : IUnitOfWork where TContext : DbContext
{
    private readonly TContext _context;

    private IDbContextTransaction _transaction;

    public UnitOfWork(TContext context)
    {
        _context = context;
    }

    public IDbContextTransaction BeginTransaction()
    {
        if (_transaction is null)
        {
            _transaction = _context.Database.BeginTransaction();
        }
        
        return _transaction;
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public int SaveChanges()
    {
        return _context.SaveChanges();
    }

    public void Dispose()
    {
        if (_transaction is not null)
        {
            _transaction.Dispose();
            _transaction = null;
        }
    }
}