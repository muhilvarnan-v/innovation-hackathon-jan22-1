using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using System.Text;
using UnityEngine.Networking;
using UnityEngine.UI;
using TMPro;
using System;

public class ClickProductBtn : MonoBehaviour
{
   
    public Sprite Noimage;
    public static string link, modelLink, id;
    public ProductInfoStorage scriptObj;
    [SerializeField]
    private AzureConnectivity AzureConnectScriptIns;
    public string productname, productimagelink, productmodellink, productid, productDescription, productManual, productSpecification,
        productWarranty, productFeatures, productCompany, productCreated, productAuthor;
    private void OnEnable()
    {
        AzureConnectScriptIns = GameObject.Find("AzureConnection").GetComponent<AzureConnectivity>();

        gameObject.transform.GetChild(1).gameObject.GetComponent<TMP_Text>().text = productname;

    }

    public void DownloadButtonImages()
    {
        StartCoroutine(GetImages(productimagelink));
    }

    IEnumerator GetImages(string prodcutImagelink)
    {
        print(productimagelink);
        if (prodcutImagelink != null && productimagelink.Contains("jpeg") || productimagelink.Contains("JPG") || productimagelink.Contains("jpg"))
        {
            var www = new UnityWebRequest(prodcutImagelink, "GET");

            www.SetRequestHeader("Cache-Control", "max-age=0, no-cache, no-store");
            www.SetRequestHeader("Pragma", "no-cache");
           // www.SetRequestHeader("Authorization", "Basic U3VyYWo6I0Jvc2NoMTIz");
            www.downloadHandler = new DownloadHandlerTexture();

            yield return www.SendWebRequest();

            if (www.isDone)
            {
                Texture2D tex = DownloadHandlerTexture.GetContent(www);
                gameObject.GetComponent<Image>().sprite = Sprite.Create(tex, new Rect(0, 0, tex.width, tex.height), new Vector2(0, 0));
            }
            yield return new WaitForSeconds(0.2f);
        }
        else
        {
            gameObject.GetComponent<Image>().sprite = Noimage;
        }
    }


    public void ClickProductButton()
    {
        SetScriptableObject();
          
        //link = productimagelink;
        //modelLink = productmodellink;
        //id = productid;
        Debug.Log(productimagelink + productmodellink + productname + productid);
        //Application.LoadLevel(4);
        Debug.Log(productimagelink + productmodellink + productname+productid);
        /*ResetScene();

        var www = new WWW(url+sasToken);
        while (!www.isDone)
            System.Threading.Thread.Sleep(1);

        //create stream and load
        var textStream = new MemoryStream(Encoding.UTF8.GetBytes(www.text));
        //var loadedObj = new OBJLoader().Load(textStream);

        GameObject obj = new OBJLoader().Load(textStream) as GameObject;
        obj.tag = "model";


        for(int i =0; i < obj.transform.childCount; i++)
        {
            if (obj.transform.GetChild(i).gameObject.GetComponent<MeshRenderer>() != null)
            {
                obj.transform.GetChild(i).gameObject.AddComponent<BoxCollider>();
                obj.transform.GetChild(i).gameObject.AddComponent<Product>();

                //this row key is used to save the hotspot in the scenetable in azure and Both rowkeys are same
                obj.transform.GetChild(i).gameObject.GetComponent<Product>().rowkey = rowkey;

                //update teh current product name in azureconnect script for partition key
                AzureConnectScript.CurrentProductonScene = productname;

                //retrive any hotspot from db
               
            }
        }
        AzureConnectScriptIns.RetriveDatafromScenetable(rowkey);*/
    }

    private void SetScriptableObject()
    {
        scriptObj.productAuthor = productAuthor;
        scriptObj.productCompany = productCompany;
        scriptObj.productCreated = productCreated;
        scriptObj.productDescription = productDescription;
        scriptObj.productFeatures = productFeatures;
        ProductInfoStorage.ProductId = productid;
        scriptObj.productManual = productManual;
        scriptObj.productModel = productmodellink;
        scriptObj.ProductName = productname;
        scriptObj.productPreview = productimagelink;
        scriptObj.productWarranty = productWarranty;
        scriptObj.productSpecification = productSpecification;
        StartCoroutine(ChangeLevel());

    }
    IEnumerator ChangeLevel()
    {
        yield return new WaitForSeconds(1);
        Application.LoadLevel(4);
    }
}
