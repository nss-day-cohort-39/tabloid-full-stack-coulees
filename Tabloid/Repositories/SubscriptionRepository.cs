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

    public class SubscriptionRepository
    {
        //saving an instance of our app db context
        private readonly ApplicationDbContext _context;

        public SubscriptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Subscription> GetAll()
        {
            return _context.Subscription
                            .Include(p => p.UserProfile)
                            .ToList();
        }

        public Subscription GetById(int id)
        {
            return _context.Subscription
                            .Include(p => p.UserProfile)
                            .FirstOrDefault(p => p.Id == id);
        }
        public List<Subscription> GetByUserProfileId(int id)
        {
            return _context.Subscription.Include(p => p.UserProfile)
                            .Where(p => p.Id== id)
                            .ToList();
        }

        public void Add(Subscription subscription)
        {
            subscription.BeginDateTime = DateAndTime.Now;
            _context.Add(subscription);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var subscription = GetById(id);
            _context.Subscription.Remove(subscription);
            _context.SaveChanges();
        }
    }
}