using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeforeThePen.Models
{
    public class Layout
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public string Type { get; set; }
        public int TimeEstimate { get; set; }
        public string Description { get; set; }

    }
}
