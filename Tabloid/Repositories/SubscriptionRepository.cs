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
                            .Include(p => p.SubscriberUserProfile)
                            .ToList();
        }

        public Subscription GetById(int id)
        {
            return _context.Subscription
                            .Include(p => p.SubscriberUserProfile)
                            .FirstOrDefault(p => p.Id == id);
        }
        public Subscription GetByPost(Post post)
        {
            return _context.Subscription
                            .Include(p => p.SubscriberUserProfile)
                            .Include(p => p.ProviderUserProfile)
                            .FirstOrDefault(p => p.ProviderUserProfileId == post.UserProfileId);
        }
        public List<Subscription> GetByUserProfileId(int id)
        {
            return _context.Subscription
                            .Where(s => s.SubscriberUserProfileId == id)
                            .Where(s => s.EndDateTime == null)
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
        public void Update(Subscription sub)
        {
            _context.Entry(sub).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}