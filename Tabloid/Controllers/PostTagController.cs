using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly PostTagRepository _postTagRepository;

        //using context instead of config
        public PostTagController(ApplicationDbContext context)
        {
            _postTagRepository = new PostTagRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postTagRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var postTag = _postTagRepository.GetById(id);
            if (postTag == null)

            {
                return NotFound();
            }
            return Ok(postTag);
        }

        [HttpPost]
        public IActionResult Post(PostTag postTag)
        {
            _postTagRepository.Add(postTag);
            return CreatedAtAction(nameof(Get), new { id = postTag.Id }, postTag);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postTagRepository.Delete(id);
            return NoContent();
        }
    }
}