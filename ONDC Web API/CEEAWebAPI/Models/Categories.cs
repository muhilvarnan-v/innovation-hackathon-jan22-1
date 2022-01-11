using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CEEAWebAPI.Models
{
    public class Categories
    {
        public int categoryid { get; set; }

        public int categoryName { get; set; }

        public int categoryDescription { get; set; }

        public int channel { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public string Model { get; set; }

        public string Asset { get; set; }

        public string Company { get; set; }

        public string Description { get; set; }

        public string Manual { get; set; }

        public string specs { get; set; }

        public string Warrantyinfo { get; set; }

        public string Transform { get; set; }

        public string Scale { get; set; }

        public string Rotation { get; set; }

        public string Text { get; set; }

        public string GUID { get; set; }
    }
}
