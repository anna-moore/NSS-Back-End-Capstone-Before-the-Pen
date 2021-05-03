using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeforeThePen.Models
{
    public class Spotlight
    {
        public int Id {get; set;}
        public string Artist { get; set; }
        public string VideoURL { get; set; }
        public string ArtistProfolioURL { get; set; }
        public string ImageURL { get; set; }
        public string About { get; set; }
    }
}
