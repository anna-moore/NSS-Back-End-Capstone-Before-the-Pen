using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BeforeThePen.Models
{
    public class TotalMonthlyAndLayout
    {
        public Monthly Monthly { get; set; }

       // [JsonConverter(typeof(SingleOrArrayConverter<string>))]
        public List<MonthlyLayout> MonthlyLayouts { get; set; }
    }
}
