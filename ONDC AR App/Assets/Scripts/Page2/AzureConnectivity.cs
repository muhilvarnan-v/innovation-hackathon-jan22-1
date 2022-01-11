using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using UnityEngine.UI;
using UnityEngine.Networking;
using Newtonsoft.Json;
using System.Net;
using System.IO;
using SimpleJSON;
using TMPro;

public class AzureConnectivity : MonoBehaviour
{
    public string purl = "https://ceeacms.azure-api.net/publishedproducts";
    private ProductData[] ProductDataIns;

    public GameObject ProductbtnPrefab, productCanvasParent;

    // Start is called before the first frame update
    void Start()
    {
        
        StartCoroutine(GetResponse(purl));
    }
    public void CallCoroutine(string url)
    {
        StartCoroutine(GetResponse(url));
    }
    public void DisposeObjects()
    {
        
        for(int i=0;i<productCanvasParent.transform.childCount;i++)
        {
           Destroy(productCanvasParent.transform.GetChild(i).gameObject);
        }
    }
    public IEnumerator GetResponse(string url)
    {
        using(UnityWebRequest req = UnityWebRequest.Get(url))
        {
            req.SetRequestHeader("accept", "application/json;odata=fullmetadata");
            req.SetRequestHeader("content-type", "application/json;odata=fullmetadata");
            req.SetRequestHeader("x-ms-date", "Tue, 30 Aug 2013 18:10:24 GMT");
            //req.SetRequestHeader("Authorization", "Basic U3VyYWo6I0Jvc2NoMTIz");

            yield return req.SendWebRequest();


            if(req.isNetworkError)
            {
                print(req.error);
            }
            else
            {
                JSONNode jobj = JSON.Parse(req.downloadHandler.text);

                string res = req.downloadHandler.text;

                print(res);
                ProductDataIns = JsonConvert.DeserializeObject<ProductData[]>(res);

                print(ProductDataIns.Length);
                DisposeObjects();
                foreach (ProductData data in ProductDataIns)
                {
                    InstantiateButton(data.ProductId, data.ProductName, data.productPreview, data.productModel,data.productDescription,data.productManual,data.productWarranty,data.productFeatures,data.productCompany,data.productCreated,data.productAuthor,data.productSpecification);
                }

            }
        }
    }


    public void InstantiateButton(int productid, string productname, string productimagelink, string productmodellink, string productDescription, string productManual, string productWarranty,string productFeatures,string productCompany,string productCreated,string productAuthor,string productSpecification)
    {
        GameObject btn = Instantiate(ProductbtnPrefab);

        btn.gameObject.transform.parent = productCanvasParent.transform;
         //btn.GetComponent<Button>().onClick.AddListener(OnClick);
        btn.transform.GetChild(1).GetComponent<TMP_Text>().text = productname;

        btn.GetComponent<ClickProductBtn>().productmodellink = productmodellink;
        btn.GetComponent<ClickProductBtn>().productDescription = productDescription;
        btn.GetComponent<ClickProductBtn>().productManual = productManual;
        btn.GetComponent<ClickProductBtn>().productWarranty = productWarranty;
        btn.GetComponent<ClickProductBtn>().productFeatures = productFeatures;
        btn.GetComponent<ClickProductBtn>().productCompany = productCompany;
        btn.GetComponent<ClickProductBtn>().productCreated = productCreated;
        btn.GetComponent<ClickProductBtn>().productAuthor = productAuthor;
        btn.GetComponent<ClickProductBtn>().productSpecification = productSpecification;
        btn.GetComponent<ClickProductBtn>().productname = productname;
        btn.GetComponent<ClickProductBtn>().productimagelink = productimagelink;
        btn.GetComponent<ClickProductBtn>().productid = productid.ToString();
        btn.GetComponent<ClickProductBtn>().DownloadButtonImages();
    }
}
