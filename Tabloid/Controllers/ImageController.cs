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

        [HttpPost]
        public IActionResult Upload(IFormFile file)
        {
            string savePath = "client/public/images/headers/";

            try
            {
                using var image = Image.Load(file.OpenReadStream());

                //shrink images that are too large
                int originalImageWidth = image.Width;
                int originalImageHeight = image.Height;

                int maxWidth = 1110; //max width that we want a header image to be
                if (originalImageWidth > maxWidth)
                {
                    //determine the proportional height of the resized image
                    int newHeight = maxWidth * originalImageHeight;
                    newHeight = newHeight / originalImageWidth;

                    image.Mutate(x => x.Resize(maxWidth, newHeight));
                }

                image.Save(savePath + file.FileName);
            } catch
            {
                return Conflict();
            }

            return Ok();
        }

        [HttpDelete]
        public IActionResult Remove(string fileName)
        {
            string deletePath = $"client/public/images/headers/{fileName}";


            if ((System.IO.File.Exists(deletePath)))
            {
                System.IO.File.Delete(deletePath);
                return Ok();
            } else
            {
                return Conflict();
            }

        }

    }
}