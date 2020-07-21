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
        public List<Post> GetPublishedByUserProfileId(int id)
        {
            return _context.Post.Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .Where(p => p.UserProfileId == id)
                            .Where(p => p.IsApproved == true)
                            .Where(p => p.PublishDateTime <= DateAndTime.Now)
                            .Where(p => p.UserProfile.IsApproved == true)
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
        public List<Post> Search(string searchString)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                string[] searchWordsArray = searchString.Split(' ');
                IEnumerable<string> newWordsArray = searchWordsArray.Select(word => $"%{word}%");
                var posts = new List<Post>();
                foreach (string searchWords in newWordsArray)
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, p.CreateDateTime, 
                               p.PublishDateTime, p.IsApproved, p.CategoryId, 
                               p.UserProfileId, p.ImageLocation, up.DisplayName AS upDisplayName,
                               up.FirebaseUserId As upFirebaseUserId, up.FirstName AS upFirstName,
                               up.LastName AS upLastName, up.Email AS upEmail, up.CreateDateTime AS upCreateDateTime,
                               up.ImageLocation AS upImageLocation, up.UserTypeId AS upUserTypeId, 
                               up.IsApproved AS upIsApproved, c.Id AS CatId, c.Name AS CatName, t.Name, up.Id AS upId
                        FROM Post p
                    
                        JOIN Category c ON c.id = p.CategoryId
                        JOIN UserProfile up ON up.Id = p.UserProfileId
                        LEFT JOIN PostTag pt ON pt.PostId = p.Id
                        LEFT JOIN Tag t ON pt.TagId = t.Id
                    
                    
                        WHERE LOWER(p.Title) LIKE @searchString

                        OR LOWER(cast(p.Content as varchar(max))) LIKE @searchString
                        OR LOWER(c.Name) LIKE @searchString
                        OR LOWER(up.DisplayName) LIKE @searchString
                        OR LOWER(t.Name) LIKE @searchString";

               

                        cmd.Parameters.AddWithValue("@searchString", searchWords.ToLower());

                        var reader = cmd.ExecuteReader();
                    
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
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                Category = new Category()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("CatId")),
                                    Name = reader.GetString(reader.GetOrdinal("CatName"))
                                },
                                UserProfile = new UserProfile()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UpId")),
                                    FirebaseUserId = reader.GetString(reader.GetOrdinal("UpFirebaseUserId")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("UpDisplayName")),
                                    FirstName = reader.GetString(reader.GetOrdinal("UpFirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("UpLastName")),
                                    Email = reader.GetString(reader.GetOrdinal("UpEmail")),
                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("upCreateDateTime")),
                                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UpUserTypeId")),
                                    IsApproved = reader.GetBoolean(reader.GetOrdinal("UpIsApproved"))
                                }
                            };

                            if (!reader.IsDBNull(reader.GetOrdinal("ImageLocation")))

                            {
                                post.ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"));
                            }

                            if (!reader.IsDBNull(reader.GetOrdinal("PublishDateTime")))

                            {
                                post.PublishDateTime = reader.GetDateTime(reader.GetOrdinal("PublishDateTime"));
                            }

                            if (!reader.IsDBNull(reader.GetOrdinal("ImageLocation")))

                            {
                                post.UserProfile.ImageLocation = reader.GetString(reader.GetOrdinal("UpImageLocation"));
                            }

                            posts.Add(post);

                        }

                        reader.Close();

                    }
                }
                return posts.GroupBy(p => p.Id).Select(p => p.FirstOrDefault()).ToList(); 
            }
        }

    }
}