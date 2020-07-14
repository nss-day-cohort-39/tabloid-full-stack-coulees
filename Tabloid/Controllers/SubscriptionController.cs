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

        //using context instead of config
        public SubscriptionController(ApplicationDbContext context)
        {
            _subscriptionRepository = new SubscriptionRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_subscriptionRepository.GetAll());
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
    }
}
