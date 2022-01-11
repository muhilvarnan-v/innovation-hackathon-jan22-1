using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CEEAWebAPI.Models
{
    public class Products
    {
        public int categoryId { get; set; }

        public string categoryName { get; set; }

        public string categoryDescription { get; set; }
        public string categoryFriendlyame { get; set; }

        public string channel { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public string ProductDescription { get; set; }

        public string ProductManual { get; set; }

        public string ProductSpecification { get; set; }

        public string ProductWarranty { get; set; }

        public string ProductFeatures { get; set; }

        public string ProductModel { get; set; }

        public string ProductCompany { get; set; }

        public string ProductPreview { get; set; }

        public string ProductAuthor { get; set; }

        public string Transform { get; set; }

        public string Scale { get; set; }

        public string Rotation { get; set; }

        public string Hotspotimage { get; set; }

        public string hotspotMedia { get; set; }

        public string HotspotText { get; set; }

        public string createdBy { get; set; }
    }
}
