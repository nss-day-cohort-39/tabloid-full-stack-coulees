using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryRepository _categoryRepository;
        private readonly PostRepository _postRepository;
  
        //using context instead of config
        public CategoryController(ApplicationDbContext context, IConfiguration configuration)
        {
            _categoryRepository = new CategoryRepository(context);
            _postRepository = new PostRepository(context, configuration);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetById(id);
            if (category == null)

            {
                return NotFound();
            }
            return Ok(category);
        }
        
        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            if (q == null)
            {
                return Ok(_categoryRepository.GetAll());
            }
            else
            {
                return Ok(_categoryRepository.Search(q, sortDesc));

            }

        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.Add(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepository.Update(category);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            List<Post> categoryList = _postRepository.GetByCategoryId(id);
            foreach (Post post in categoryList)
            {
                post.CategoryId = 0;
                _postRepository.Update(post);
            }
            _categoryRepository.Delete(id);
            return NoContent();
        }
       
    }
}
