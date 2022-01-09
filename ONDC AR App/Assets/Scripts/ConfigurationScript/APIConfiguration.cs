using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class APIConfiguration : MonoBehaviour
{
   
    public static readonly string baseAPI = "https://ceeacms.azure-api.net/publishedproducts";
    public static readonly string hotspotExtension = "/hotspots";

     public static readonly string publishedCategoryAPI = "https://ceeacms.azure-api.net/publishedproducts/categories";
    public static readonly string categoryAPI = "https://ceeacms.azure-api.net/api/categories";
    //// public static readonly string hotspotAPI= "https://ceeaapim.azure-api.net/publishedproducts/" + ClickProductBtn.id + "/hotspots/";
    // Start is called before the first frame update


    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
