using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeforeThePen.Models
{
    public class TotalMonthlyAndLayout
    {
        public Monthly Monthly { get; set; }
        public List<MonthlyLayout> MonthlyLayouts { get; set; }
    }
}
