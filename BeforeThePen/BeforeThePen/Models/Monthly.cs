using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeforeThePen.Models
{
    public class Monthly
    {
        public int Id { get; set; }

        public int UserProfileId { get; set; }

        public string Month { get; set; }

        public int Year { get; set; }
    }
}
