using System.Linq.Expressions;
using DataAccess.Entities.BaseEntities;

namespace Application.Services.Abstractions.BaseServices;

public interface IBaseCrudService<TEntity, TDto> 
    where TEntity : BaseEntity
    where TDto : class
{
    Task<TDto> Add(TDto dto);
    Task<TDto> Update(TDto dto);
    Task<TDto> Remove(Guid id);
    Task<TDto> GetById(Guid id);
    Task<IEnumerable<TDto>> GetAll(Expression<Func<TEntity, bool>>? predicate = null);
}