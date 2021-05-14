using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeforeThePen.Models
{
    public class Resource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserProfileId { get; set; }
        public int TypeOfMediaId { get; set;}
        public string URL { get; set; }
        public string? ImageURL { get; set; }
        public string? Description { get; set; }
        public UserProfile UserProfile { get; set; }
        public TypeOfMedia TypeOfMedia { get; set; }
    }
}
