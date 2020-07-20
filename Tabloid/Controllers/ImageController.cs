using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly PostRepository _postRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly PostTagRepository _postTagRepository;
        private readonly CommentRepository _commentRepository;

        //using context instead of config
        public ImageController(ApplicationDbContext context)
        {
            _postRepository = new PostRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _postTagRepository = new PostTagRepository(context);
            _commentRepository = new CommentRepository(context);
        }

        [HttpPost]
        public IActionResult Upload(IFormFile file)
        {
            string savePath = "wwwroot/images/headers/";

            using var image = Image.Load(file.OpenReadStream());
            //image.Mutate(x => x.Resize(256, 256));

            image.Save(savePath+file.FileName);
            return Ok();
        }

    }
}