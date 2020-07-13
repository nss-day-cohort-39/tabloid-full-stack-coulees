using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly CommentRepository _commentRepository;

        private readonly UserProfileRepository _userProfileRepository;


        //using context instead of config
        public CommentController(ApplicationDbContext context)
        {
            _commentRepository = new CommentRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
         
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepository.GetAllComments());
        }

        //https://localhost/api/comment/getcomment/1
        [HttpGet("getcomment/{id}")]
        public IActionResult GetComment(int id)
        {
            return Ok(_commentRepository.GetCommentById(id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var comment = _commentRepository.GetCommentById(id);
            if (comment == null)

            {
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.Update(comment);
            return NoContent();
        }

        //https://localhost/api/comment/getcommentsbypost/1
        [HttpGet("getcommentsbypost/{id}")]
        public IActionResult GetByPost(int id)
        {
            return Ok(_commentRepository.GetCommentsByPostId(id));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Comment(Comment comment)
        {
            var currentUserProfile = GetCurrentUserProfile();
            comment.UserProfileId = currentUserProfile.Id;
            comment.CreateDateTime = DateAndTime.Now;
            _commentRepository.Add(comment);
            return CreatedAtAction(nameof(Get), new { id = comment.Id }, comment);
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

