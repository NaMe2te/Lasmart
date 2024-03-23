using Application.Dtos;
using Application.Services.Abstractions.BaseServices;
using AutoMapper;
using DataAccess.Entities;
using DataAccess.Repositories;
using DataAccess.UnitOfWork;

namespace Application.Services;

public class PointService : BaseCrudService<Point, PointDto>
{
    public PointService(IBaseRepository<Point> repository, IUnitOfWork unitOfWork, IMapper mapper) 
        : base(repository, unitOfWork, mapper) { }
}