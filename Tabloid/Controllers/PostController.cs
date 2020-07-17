using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Collections.Generic;
using System;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostRepository _postRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly PostTagRepository _postTagRepository;
        private readonly CommentRepository _commentRepository;

        //using context instead of config
        public PostController(ApplicationDbContext context)
        {
            _postRepository = new PostRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _postTagRepository = new PostTagRepository(context);
            _commentRepository = new CommentRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);
            if (post == null || post.UserProfile.IsApproved == false)
            {
                return NotFound();
            }
            return Ok(post);
        }
        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            return Ok(_postRepository.GetByUserProfileId(id));
        }
        [HttpGet("currentUser")]
        public IActionResult GetByCurrentUser()
        {
            int currentUserId = GetCurrentUserProfile().Id;

            return Ok(_postRepository.GetByUserProfileId(currentUserId));
        }
        [HttpGet("getpublished")]
        public IActionResult GetPublished()
        {
            return Ok(_postRepository.GetPublished());
        }

        //[HttpGet("search")]
        //public IActionResult Search(string q, bool sortDesc)
        //{
        //    if (q == null)
        //    {
        //        return Ok(_postRepository.GetAll());
        //    }
        //    else
        //    {
        //        return Ok(_postRepository.Search(q, sortDesc));

        //    }

        //}
        [HttpPost]
        public IActionResult Post(Post post)
        {
            int userId = GetCurrentUserProfile().Id;
            post.UserProfileId = userId;
            _postRepository.Add(post);
            post.IsApproved = false;
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }
            //delete the tags associated with the post
            List<PostTag> postTags = _postTagRepository.GetByPostId(id);
            foreach (PostTag postTag in postTags)
            {
                _postTagRepository.Delete(postTag.Id);
            }

            _postRepository.Update(post);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            int userId = GetCurrentUserProfile().Id;
            Post PostToDelete = _postRepository.GetById(id);
            if(userId == PostToDelete.UserProfileId)
            {
                //delete the tags and comments associated with the post
                List<PostTag> postTags = _postTagRepository.GetByPostId(id);
                foreach(PostTag postTag in postTags)
                {
                    _postTagRepository.Delete(postTag.Id);
                }
                List<Comment> CommentsToDelete = _commentRepository.GetCommentsByPostId(id);
                foreach (Comment comment in CommentsToDelete)
                {
                    _commentRepository.Delete(comment.Id);
                }

                    _postRepository.Delete(id);
                return NoContent();
            }
            return Unauthorized();
        }

        [HttpGet("search")]
        public IActionResult Search(string searchString)
        {
            if (!String.IsNullOrEmpty(searchString))
            {
                return Ok(_postRepository.GetAll());
            }
            else
            {
                return Ok(_postRepository.Search());

            }
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}