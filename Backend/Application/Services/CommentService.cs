using Application.Dtos;
using Application.Services.Abstractions;
using Application.Services.Abstractions.BaseServices;
using AutoMapper;
using DataAccess.Entities;
using DataAccess.Repositories;
using DataAccess.UnitOfWork;

namespace Application.Services;

public class CommentService : BaseCrudService<Comment, CommentDto>,
    ICommentService
{
    public CommentService(IBaseRepository<Comment> repository, IUnitOfWork unitOfWork, IMapper mapper)
        : base(repository, unitOfWork, mapper) { }

    public async Task<IEnumerable<CommentDto>> GetByPoint(Guid pointId)
    {
        return await GetAll(c => c.PointId == pointId);
    }
}