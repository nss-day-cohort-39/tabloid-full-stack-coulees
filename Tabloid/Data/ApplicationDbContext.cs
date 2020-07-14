using Microsoft.EntityFrameworkCore;
using Tabloid.Models;

namespace Tabloid.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Post> Post { get; set; }

        public DbSet<Category> Category { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<PostTag> PostTag { get; set; }
        public DbSet<UserType> UserType { get; set; }
        public DbSet<Subscription> Subscription { get; set; }
    }
}
