﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Repositories;

namespace Tabloid.Models
{
    public class Subscription
    {
        public int Id { get; set; }

        [Required]
        public int SubscriberUserProfileId { get; set; }
        
        [Required]
        public int ProviderUserProfileId { get; set; }
        public UserProfile SubscriberUserProfile { get; set; }
        public UserProfile ProviderUserProfile { get; set; }

        [Required]
        public DateTime BeginDateTime { get; set; }

        public DateTime? EndDateTime { get; set; }
    }
}
