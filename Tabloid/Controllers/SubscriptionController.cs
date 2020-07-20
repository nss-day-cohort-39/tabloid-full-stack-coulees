using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[Controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly SubscriptionRepository _subscriptionRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly PostRepository _postRepostiory;

        //using context instead of config
        public SubscriptionController(ApplicationDbContext context)
        {
            _subscriptionRepository = new SubscriptionRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _postRepostiory = new PostRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_subscriptionRepository.GetAll());
        }
        [HttpGet("currentUser")]
        public IActionResult GetSubscribedAuthorPostsForCurrentUser()
        {
            var currentUserId = GetCurrentUserProfile().Id;
            var currentUserSubs = _subscriptionRepository.GetByUserProfileId(currentUserId);
            List<Post> CurrentUserSubPosts = new List<Post>();
            foreach (var sub in currentUserSubs)
            {
                var PostList = _postRepostiory.GetByUserProfileId(sub.ProviderUserProfileId);
                foreach(var post in PostList)
                {
                    CurrentUserSubPosts.Add(post);
                }
            }

            if (currentUserSubs == null)
            {
                return NotFound();
            }
            return Ok(CurrentUserSubPosts);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var subscription = _subscriptionRepository.GetById(id);
            if (subscription == null)
            {
                return NotFound();
            }
            return Ok(subscription);
        }         

        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            _subscriptionRepository.Add(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _subscriptionRepository.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
