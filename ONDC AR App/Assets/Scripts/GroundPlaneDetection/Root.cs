using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
public class Root
{
     public int categoryid { get; set; }
        public string categoryName { get; set; }
        public string categoryDescription { get; set; }
        public string channel { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int categoryid1 { get; set; }
        public string productDescription { get; set; }
        public string productManual { get; set; }
        public string productSpecification { get; set; }
        public string productWarranty { get; set; }
        public string productFeatures { get; set; }
        public string productModel { get; set; }
        public string productCompany { get; set; }
        public string productPreview { get; set; }
        public DateTime productCreated { get; set; }
        public string productAuthor { get; set; }
}
[Serializable]
public class HotspotData
{
    public int hotspotid { get; set; }
    public string transform { get; set; }
    public string scale { get; set; }
    public string rotation { get; set; }
    public string hotspotText { get; set; }
    public string hotspotimage { get; set; }
    public string hotspotMedia { get; set; }
    public string createdBy { get; set; }
}

