﻿
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;
using System.Security.Claims;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
  
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly UserProfileRepository _userProfileRepository;
        public UserProfileController(ApplicationDbContext context)
        {
            _userProfileRepository = new UserProfileRepository(context);
        }
        [HttpGet]
        public IActionResult GetCurrent()
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserType.Name == "Admin")
            {
                return Ok(_userProfileRepository.GetAll());
            }
            return Unauthorized();
        }

        [HttpGet("current")]
        public IActionResult Get()
        {
            var currentUser = GetCurrentUserProfile();
            return Ok(_userProfileRepository.GetByFirebaseUserId(currentUser.FirebaseUserId));
        }

        [HttpGet("active")]
        public IActionResult GetActiveUsers()
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserType.Name == "Admin")
            {
                return Ok(_userProfileRepository.GetAllActive());
            }
            return Unauthorized();
        }
        [HttpGet("deactivated")]
        public IActionResult GetDeactivatedUsers()
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserType.Name == "Admin")
            {
                return Ok(_userProfileRepository.GetDeactivated());
            }
            return Unauthorized();
        }
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile user)
        {
            _userProfileRepository.Update(user);
            return NoContent();
        }

        [HttpPut("deactivate/{id}")]
        public IActionResult Deactivate(int id, UserProfile user)
        {
            var currentUser = GetCurrentUserProfile();
            if(currentUser.UserType.Name == "Admin")
            {
                user.IsApproved = false;
                _userProfileRepository.Update(user);
                return NoContent();
            }

            return Unauthorized();
        }
        [HttpPut("reactivate/{id}")]
        public IActionResult reactivate(int id, UserProfile user)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser.UserType.Name == "Admin")
            {
                user.IsApproved = true;
                _userProfileRepository.Update(user);
                return NoContent();
            }

            return Unauthorized();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
