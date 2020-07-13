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

    public class PostTagRepository
    {
        //saving an instance of our app db context
        private readonly ApplicationDbContext _context;

        public PostTagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostTag> GetAll()
        {
            return _context.PostTag.Include(pt => pt.Tag).ToList();
        }

        public PostTag GetById(int id)
        {
            return _context.PostTag.Include(pt => pt.Tag).FirstOrDefault(p => p.Id == id);
        }

        public void Add(PostTag postTag)
        {
            _context.Add(postTag);
            _context.SaveChanges();
        }

        public void Update(PostTag postTag)
        {
            _context.Entry(postTag).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var postTag = GetById(id);
            _context.PostTag.Remove(postTag);
            _context.SaveChanges();
        }

    }
}