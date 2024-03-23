using System.Linq.Expressions;
using DataAccess.DBContexts;
using DataAccess.Entities.BaseEntities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories.EfRepositories;

public abstract class BaseEfRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
{
    protected readonly DatabaseContext _databaseContext;

    protected BaseEfRepository(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public async Task<TEntity> Add(TEntity entity)
    {
        return (await _databaseContext.Set<TEntity>().AddAsync(entity)).Entity;
    }

    public async Task<TEntity> Update(TEntity model)
    {
        return _databaseContext.Set<TEntity>().Update(model).Entity;
    }

    public TEntity Delete(TEntity model)
    {
        return _databaseContext.Set<TEntity>().Remove(model).Entity;
    }

    public async Task<TEntity> Get(Expression<Func<TEntity, bool>> predicate)
    {
        return await _databaseContext.Set<TEntity>().FirstOrDefaultAsync(predicate) ?? throw new ArgumentNullException(typeof(TEntity).Name);
    }

    public async Task<TEntity?> Find(Expression<Func<TEntity, bool>> predicate)
    {
        return await _databaseContext.Set<TEntity>().FirstOrDefaultAsync(predicate);
    }

    public async Task<IEnumerable<TEntity>> GetAll(Expression<Func<TEntity, bool>>? predicate = null)
    {
        IQueryable<TEntity> queryable = _databaseContext.Set<TEntity>();

        if (predicate is not null)
        {
            queryable = queryable.Where(predicate);
        }

        return await queryable.ToListAsync();
    }
}