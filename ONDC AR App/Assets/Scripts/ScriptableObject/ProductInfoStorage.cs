using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(fileName = "ProductInfo", menuName = "ProductInfoObj")]
public class ProductInfoStorage : ScriptableObject
{

    public static string ProductId;
    public string ProductName;
    public string productDescription;
    public string productManual;
    public string productWarranty;
    public string productFeatures;
    public string productModel;
    public string productCompany;
    public string productPreview;
    public string productCreated;
    public string productAuthor;
    public string productSpecification;
  
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
