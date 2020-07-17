using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;
using Microsoft.VisualBasic;
using System.Security.Claims;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Tabloid.Repositories
{
   
    public class PostRepository
    {
        //saving an instance of our app db context
        private readonly ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Post> GetAll()
        {
            return _context.Post
                            .Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .ToList();
        }

        public List<Post> Search(string criterion, bool sortDescending)
        {
            var query = _context.Post
                                .Include(p => p.UserProfile)
                                .Where(p => p.Title.Contains(criterion));

            return sortDescending
                ? query.OrderByDescending(p => p.CreateDateTime).ToList()
                : query.OrderBy(p => p.CreateDateTime).ToList();
        }

        public Post GetById(int id)
        {
            return _context.Post
                            .Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .FirstOrDefault(p => p.Id == id);
        }
        public List<Post> GetByCategoryId(int id)
        {
            return _context.Post
                            .Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .Where(p => p.CategoryId == id).ToList();
        }
        public List<Post> GetByUserProfileId(int id)
        {
            return _context.Post.Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .Where(p => p.UserProfileId == id)
                            .OrderByDescending(p => p.CreateDateTime)
                            .ToList();
        }

        public void Add(Post post)
        {
            post.CreateDateTime = DateAndTime.Now;
            _context.Add(post);
            _context.SaveChanges();
        }

        public void Update(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var post = GetById(id);
            _context.Post.Remove(post);
            _context.SaveChanges();
        }

        public List<Post> GetPublished()
        {
            return _context.Post
                            .Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .Where(p => p.IsApproved == true)
                            .Where(p => p.PublishDateTime <= DateAndTime.Now)
                            .Where(p => p.UserProfile.IsApproved == true)
                            .OrderByDescending(p => p.PublishDateTime)
                            .ToList();
        }


       
    }
}