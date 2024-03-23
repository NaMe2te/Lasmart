using Application.Dtos;
using AutoMapper;
using DataAccess.Entities;

namespace Application.Mapping.AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreatePointMap();
        CreateCommentMap();
    }

    private void CreatePointMap()
    {
        CreateMap<Comment, CommentDto>().ReverseMap();
    }

    private void CreateCommentMap()
    {
        CreateMap<Point, PointDto>().ReverseMap();
    }
}