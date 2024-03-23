using System.Net;
using API.Controllers.BaseControllers;
using Application.Dtos;
using Application.Services.Abstractions;
using Application.Services.Abstractions.BaseServices;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CommentController : BaseController<Comment, CommentDto>
{
    private readonly ICommentService _commentService;
    
    public CommentController(ICommentService service)
        : base(service)
    {
        _commentService = service;
    }

    [HttpGet(nameof(GetByPoint) + "/{id}")]
    [ProducesResponseType((int) HttpStatusCode.OK)]
    public async Task<ActionResult<CommentDto>> GetByPoint(Guid pointId)
    {
        var dtos = await _commentService.GetByPoint(pointId);
        return Ok(dtos);
    }
}