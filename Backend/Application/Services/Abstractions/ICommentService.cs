using Application.Dtos;
using Application.Services.Abstractions.BaseServices;
using DataAccess.Entities;

namespace Application.Services.Abstractions;

public interface ICommentService : IBaseCrudService<Comment, CommentDto>
{
    Task<IEnumerable<CommentDto>> GetByPoint(Guid pointId);
}