using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeforeThePen.Models
{
    public class MonthlyLayout
    {
        public int Id { get; set; }
        public int MonthlyId { get; set; }
        public int LayoutId { get; set; }
        public string? InspiredBy { get; set; }
        public string? ImageURL { get; set; }
        public int? ResourceId { get; set; }        
        public Layout Layout { get; set; }
        public Monthly Monthly { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
