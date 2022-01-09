using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Newtonsoft.Json;
[Serializable]
public class ProductData
{
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public int categoryid ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string categoryName ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string categoryDescription ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string channel ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public int ProductId ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string ProductName ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public int categoryid1 ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productDescription ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productManual ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productSpecification ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productWarranty ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productFeatures ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productModel ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productCompany ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productPreview ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productCreated ;
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productAuthor ;
}
public class CategoryData
{
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public int categoryid { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string categoryName { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string categoryDescription { get; set; }
}
public class PublishedCategoryData
{
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string categoryName { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string categoryDescription { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string channel { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public int ProductId { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string ProductName { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productModel { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productAuthor { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productCompany { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productDescription { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productManual { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productSpecification { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productWarranty { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productFeatures { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string productPreview { get; set; }
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public DateTime productCreated { get; set; }
}
