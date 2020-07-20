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
        [HttpGet("subposts")]
        public IActionResult GetSubscribedAuthorPostsForCurrentUser()
        {
            var currentUserId = GetCurrentUserProfile().Id;
            var currentUserSubs = _subscriptionRepository.GetByUserProfileId(currentUserId);
            List<Post> CurrentUserSubPosts = new List<Post>();
            foreach (var sub in currentUserSubs)
            {
                var PostList = _postRepostiory.GetPublishedByUserProfileId(sub.ProviderUserProfileId);
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

        [HttpGet("subs")]
        public IActionResult GetCurrentUserSubs()
        {
            var currentUserId = GetCurrentUserProfile().Id;
            var subscriptions = _subscriptionRepository.GetByUserProfileId(currentUserId);
            if (subscriptions == null)
            {
                return NotFound();
            }
            return Ok(subscriptions);
        }
        [HttpGet("sub/{id}")]
        public IActionResult GetSubByPost(int id)
        {
            var post = _postRepostiory.GetById(id);
            var subscription = _subscriptionRepository.GetByPost(post);
            if (subscription == null)
            {
                return NotFound();
            }
            return Ok(subscription);
        }
        [HttpGet("isSub/{id}")]
        public IActionResult IsSubscribed(int id)
        {
            var currentUser = GetCurrentUserProfile();
            var subscriptions = _subscriptionRepository.GetByUserProfileId(currentUser.Id);
            var post = _postRepostiory.GetById(id);
            if(subscriptions.Exists(s => s.ProviderUserProfileId == post.UserProfileId && s.EndDateTime == null))
            {
                return Ok(new {IsSubscribed = true});
            }
            else
            {
                return Ok(new { IsSubscribed = false });
            }
        }
        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            var CurrentUserId = GetCurrentUserProfile().Id;
            var CurrentUserSubs = _subscriptionRepository.GetByUserProfileId(CurrentUserId);
            if(CurrentUserSubs.Exists(s => s.ProviderUserProfileId == subscription.ProviderUserProfileId))
            {
                return Unauthorized();
            }
            _subscriptionRepository.Add(subscription);
            return CreatedAtAction("Get", new { id = subscription.Id }, subscription);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _subscriptionRepository.Delete(id);
            return NoContent();
        }
        [HttpPut("unsubscribe/{id}")]
        public IActionResult Put(int id)
        {
            var sub = _subscriptionRepository.GetById(id);
            sub.EndDateTime = DateTime.Now;

            _subscriptionRepository.Update(sub);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
