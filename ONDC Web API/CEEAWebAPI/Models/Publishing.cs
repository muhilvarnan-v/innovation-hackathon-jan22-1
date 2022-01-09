using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CEEAWebAPI.Models
{
    public class Publishing
    {
        public int publishingId { get; set; }
        public string publisherSource { get; set; }
        public int productId { get; set; }
        public string publishingStatus { get; set; }
        public string SubmittedBy { get; set; }
    }
}
