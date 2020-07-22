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

        [HttpPost("avatar")]
        public IActionResult UploadAvatar(IFormFile file)
        {
            string savePath = "client/public/images/avatars/";

            try
            {
                //upload full size/larger image
                using var image = Image.Load(file.OpenReadStream());

                //shrink images that are too large
                int originalImageWidth = image.Width;
                int originalImageHeight = image.Height;

                int newHeight = 0;

                int maxWidth = 500; //max width that we want a header image to be
                if (originalImageWidth > maxWidth)
                {
                    //determine the proportional height of the resized image
                    newHeight = maxWidth * originalImageHeight;
                    newHeight = newHeight / originalImageWidth;

                    image.Mutate(x => x.Resize(maxWidth, newHeight));
                }

                image.Save(savePath + "full/" + file.FileName);

                //upload the smaller 100 x 100 image
                maxWidth = 100; //max width that we want a header image to be

                //determine the proportional height of the resized image
                newHeight = maxWidth * originalImageHeight;
                newHeight = newHeight / originalImageWidth;

                image.Mutate(x => x.Resize(maxWidth, newHeight));

                image.Save(savePath + "small/" + file.FileName);

            }
            catch
            {
                return Conflict();
            }

            return Ok();
        }

        [HttpDelete("avatar")]
        public IActionResult RemoveAvatar(string fileName)
        {
            string deletePath1 = $"client/public/images/avatars/full/{fileName}";
            string deletePath2 = $"client/public/images/avatars/small/{fileName}";

            try { 
                System.IO.File.Delete(deletePath1);
                System.IO.File.Delete(deletePath2);
                return Ok();
            }
            catch
            {
                return Conflict();
            }

        }

    }
}