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
using Microsoft.Data.SqlClient;
using System.Collections;
using System.Threading.Tasks.Dataflow;

namespace Tabloid.Repositories
{
   
    public class PostRepository
    {
        //saving an instance of our app db context
        private readonly ApplicationDbContext _context;
        private readonly string _connectionString;

        public PostRepository(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _connectionString = configuration.GetConnectionString("DefaultConnection");

        }

        public SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }
        public List<Post> GetAll()
        {
            return _context.Post
                            .Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .OrderByDescending(p => p.PublishDateTime)
                            .ToList();
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

        //JOIN Tag t ON t.Id = PostTag.TagId
        //JOIN Category c ON c.id = p.CategoryId
        //           JOIN UserProfile up ON up.Id = p.UserProfileId
        //           JOIN PostTag pt ON pt.PostId = p.Id



        //OR LOWER(c.Name) LIKE @searchString
        //OR LOWER(up.DisplayName) LIKE @searchString
        public List<Post> Search(string searchString)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.Title, p.Content, p.CreateDateTime, 
                           p.PublishDateTime, p.IsApproved, p.CategoryId, 
                           p.UserProfileId, p.ImageLocation
                    FROM Post p
                    WHERE LOWER(p.Title) LIKE @searchString 
                    OR LOWER(cast(p.Content as varchar(max))) LIKE @searchString";
                    string[] searchWordsArray = searchString.Split(' ');
                    IEnumerable<string> newWordsArray = searchWordsArray.Select(word => $"%{word}%");
                    string searchWords = string.Join("|", newWordsArray);
                    cmd.Parameters.AddWithValue("@searchString", searchWords.ToLower());
                    
                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        Post post = new Post()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))

                        };

                        if (!reader.IsDBNull(reader.GetOrdinal("ImageLocation")))

                        {
                            post.ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"));
                        }

                        if (!reader.IsDBNull(reader.GetOrdinal("PublishDateTime")))

                        {
                            post.PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime"));
                        }

                        posts.Add(post);

                    }

                    reader.Close();

                    return posts;
                }
            }
        }







    }
}