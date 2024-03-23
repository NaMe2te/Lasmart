using API.Controllers.BaseControllers;
using Application.Dtos;
using Application.Services.Abstractions.BaseServices;
using DataAccess.Entities;

namespace API.Controllers;

public class PointController : BaseController<Point, PointDto>
{
    public PointController(IBaseCrudService<Point, PointDto> service)
        : base(service) { }
}