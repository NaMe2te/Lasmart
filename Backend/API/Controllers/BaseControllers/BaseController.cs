using System.Net;
using Application.Services.Abstractions.BaseServices;
using DataAccess.Entities.BaseEntities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.BaseControllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController<TEntity, TDto> : ControllerBase
    where TEntity : BaseEntity
    where TDto : class
    
{
    protected readonly IBaseCrudService<TEntity, TDto> _service;

    protected BaseController(IBaseCrudService<TEntity, TDto> service)
    {
        _service = service;
    }

    [HttpPost(nameof(Create))]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<ActionResult<TDto>> Create([FromBody] TDto dto)
    {
        var createdDto = await _service.Add(dto);
        return Ok(createdDto);
    }

    [HttpPut(nameof(Update))]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<ActionResult<TDto>> Update([FromBody] TDto dto)
    {
        var updatedDto = await _service.Update(dto);
        return Ok(updatedDto);
    }
    
    [HttpGet(nameof(GetById) + "/{id}")]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<ActionResult<TDto>> GetById(Guid id)
    {
        var dto = await _service.GetById(id);
        return Ok(dto);
    }
    
    [HttpGet(nameof(GetAll))]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<ActionResult<TDto>> GetAll()
    {
        var dtos = await _service.GetAll();
        return Ok(dtos);
    }

    [HttpDelete(nameof(Remove) + "/{id}")]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<ActionResult<TDto>> Remove(Guid id)
    {
        var dto = await _service.Remove(id);
        return Ok(dto);
    }
}