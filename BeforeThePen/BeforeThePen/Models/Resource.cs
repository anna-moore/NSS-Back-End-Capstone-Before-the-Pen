using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeforeThePen.Models
{
    public class Resource
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int TypeOfMedia { get; set;}
        public string URL { get; set; }
        public string ImageURL { get; set; }

    }
}
