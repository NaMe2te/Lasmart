using System.Linq.Expressions;
using DataAccess.Entities.BaseEntities;

namespace DataAccess.Repositories;

public interface IBaseRepository<TEntity> where TEntity : BaseEntity
{
    Task<TEntity> Add(TEntity model);
    Task<TEntity> Update(TEntity model);
    TEntity Delete(TEntity model);
    Task<TEntity> Get(Expression<Func<TEntity, bool>> predicate);
    Task<TEntity?> Find(Expression<Func<TEntity, bool>> predicate);
    Task<IEnumerable<TEntity>> GetAll(Expression<Func<TEntity, bool>>? predicate = null);
}