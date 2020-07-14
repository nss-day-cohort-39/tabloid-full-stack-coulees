using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class CommentRepository
    {
        //saving an instance of our app db context
        private readonly ApplicationDbContext _context;
        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Comment GetCommentById(int id)
        {
            return _context.Comment
                           .Include(c => c.Post)
                           .FirstOrDefault(c => c.Id == id);
        }
        public List<Comment> GetAllComments()
        {
            return _context.Comment
                           .Include(c=> c.Post)
                           .ToList();
        }
        public List<Comment> GetCommentsByPostId(int id)
        {
            return _context.Comment
                            .Include(c => c.UserProfile)
                            .Include(c => c.Post)
                            .OrderByDescending(c => c.CreateDateTime)
                            .Where(c => c.PostId == id)
                            .ToList();
        }
        
        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var comment = GetCommentById(id);
            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }

    }
}
