using System.Linq.Expressions;
using AutoMapper;
using DataAccess.Entities.BaseEntities;
using DataAccess.Repositories;
using DataAccess.UnitOfWork;

namespace Application.Services.Abstractions.BaseServices;

public abstract class BaseCrudService<TEntity, TDto> : IBaseCrudService<TEntity, TDto> 
    where TEntity : BaseEntity
    where TDto : class
{
    protected readonly IBaseRepository<TEntity> _repository;
    protected readonly IUnitOfWork _unitOfWork;
    protected readonly IMapper _mapper;

    protected BaseCrudService(IBaseRepository<TEntity> repository, IUnitOfWork unitOfWork, IMapper mapper)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public virtual async Task<TDto> Add(TDto dto)
    {
        var entity = _mapper.Map<TEntity>(dto);
        entity = await _repository.Add(entity);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<TDto>(entity);
    }

    public virtual async Task<TDto> Update(TDto dto)
    {
        var entity = _mapper.Map<TEntity>(dto);
        entity = await _repository.Update(entity);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<TDto>(entity);
    }

    public virtual async Task<TDto> Remove(Guid id)
    {
        var entity = await _repository.Get(e => e.Id == id);
        _repository.Delete(entity);
        await _unitOfWork.SaveChangesAsync();
        return _mapper.Map<TDto>(entity);
    }

    public virtual async Task<TDto> GetById(Guid id)
    {
        var entity = await _repository.Get(e => e.Id == id);
        return _mapper.Map<TDto>(entity);
    }

    public virtual async Task<IEnumerable<TDto>> GetAll(Expression<Func<TEntity, bool>>? predicate = null)
    {
        var entities = await _repository.GetAll(predicate);
        return _mapper.Map<IEnumerable<TDto>>(entities);
    }
}