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

public class HotspotConnection : MonoBehaviour
{
    public ProductInfoStorage scriptObj;
    private GameObject emptyParent;
    private int count = 1;
   string purl = APIConfiguration.baseAPI+"/"+ ProductInfoStorage.ProductId + APIConfiguration.hotspotExtension;
   // string purl = "https://ceeacms.azure-api.net/publishedproducts/11/hotspots";
    private HotspotData[] HotspotDataIns;

    public GameObject ProductbtnPrefab, productCanvasParent,controller,Loading,Measure;

    // Start is called before the first frame update
    void Start()
    {
      
        Debug.Log(purl);
        StartCoroutine(GetResponse(purl));
    }

    IEnumerator GetResponse(string url)
    {
        using (UnityWebRequest req = UnityWebRequest.Get(url))
        {
            req.SetRequestHeader("accept", "application/json;odata=fullmetadata");
            req.SetRequestHeader("content-type", "application/json;odata=fullmetadata");
            req.SetRequestHeader("x-ms-date", "Tue, 30 Aug 2013 18:10:24 GMT");
           // req.SetRequestHeader("Authorization", "Basic U3VyYWo6I0Jvc2NoMTIz");
            yield return req.SendWebRequest();


            if (req.isNetworkError)
            {
                print(req.error);
            }
            else
            {
                JSONNode jobj = JSON.Parse(req.downloadHandler.text);

                string res = req.downloadHandler.text;

                print(res);
                HotspotDataIns = JsonConvert.DeserializeObject<HotspotData[]>(res);
                print(HotspotDataIns.Length);
                emptyParent = new GameObject();
                emptyParent.name = "HotspotParent";
                emptyParent.transform.parent = productCanvasParent.transform;
                if (HotspotDataIns.Length==0)
                {
                    controller.GetComponent<ARTap>().enabled = true;
                    Loading.SetActive(false);
                    productCanvasParent.SetActive(true);
                    controller.GetComponent<ARTap>().model = productCanvasParent;
                    StartCoroutine(Delay());
                }
                else
                {
                   
                    
                    foreach (HotspotData data in HotspotDataIns)
                    {
                        InstantiateHotspot(data.transform, data.rotation, data.scale, data.hotspotText, data.hotspotimage, data.hotspotMedia);
                    }
                    EnableModel();
                }
               

            }
        }
    }

    private void EnableModel()
    {
        emptyParent.transform.localRotation = Quaternion.Euler(0, 0, 0);
        emptyParent.tag = "hotspot";
        emptyParent.SetActive(false);
        Loading.SetActive(false);
        controller.GetComponent<ARTap>().enabled = true;
        productCanvasParent.SetActive(true);

        controller.GetComponent<ARTap>().model = productCanvasParent;
        StartCoroutine(Delay());
    }

    public void InstantiateHotspot(string transform, string rotation,string scale,string hotspotText, string productimagelink, string productmodellink)
    {
        GameObject btn = Instantiate(ProductbtnPrefab);

        // btn.transform.parent = productCanvasParent.transform;
        btn.transform.parent = emptyParent.transform;

        //btn.GetComponent<Button>().onClick.AddListener(OnClick);
        btn.transform.GetChild(0).GetChild(0).GetChild(1).GetComponent<TextMeshProUGUI>().text = count.ToString();
        btn.transform.GetChild(0).GetChild(0).GetChild(0).GetChild(0).GetChild(0).GetComponent<TextMeshProUGUI>().text = hotspotText;
        string[] hotspotPosition = transform.Split(',');
        string[] hotspotScale = scale.Split(',');
        string[] hotspotRotation = rotation.Split(',');
        for(int i=0;i<3;i++)
        {
            Debug.Log(float.Parse(hotspotPosition[i]) + "   " + float.Parse(hotspotScale[i]));
        }
        btn.transform.position = new Vector3(float.Parse(hotspotPosition[0]), float.Parse(hotspotPosition[1])+0.2f, float.Parse(hotspotPosition[2]));
       // btn.transform.localScale = new Vector3(float.Parse(hotspotScale[0]), float.Parse(hotspotScale[1]), float.Parse(hotspotScale[2]));
        btn.transform.rotation =  Quaternion.Euler(0, -(float.Parse(rotation)-100), 0);
        count++;
       
       
        
        //btn.GetComponent<ClickProductBtn>().productmodellink = productmodellink;
        //btn.GetComponent<ClickProductBtn>().productname = productname;
        //btn.GetComponent<ClickProductBtn>().productimagelink = productimagelink;
        //btn.GetComponent<ClickProductBtn>().DownloadButtonImages();
    }
    IEnumerator Delay()
    {
        yield return new WaitForSeconds(0);
        
        gameObject.SetActive(false);
    }

    public void xvalue(float x)
    {
        if (x < 360)
            x += 30;
        else
            x = 0;

        productCanvasParent.transform.rotation = Quaternion.Euler(x, productCanvasParent.transform.rotation.y, productCanvasParent.transform.rotation.z);

    }

    public void yvalue(float y)
    {
        if (y < 360)
            y += 30;
        else
            y = 0;
        productCanvasParent.transform.rotation = Quaternion.Euler(productCanvasParent.transform.rotation.x, y, productCanvasParent.transform.rotation.z);

    }

    public void zvalue(float z)
    {
        if (z < 360)
            z += 30;
        else
            z = 0;
        productCanvasParent.transform.rotation = Quaternion.Euler(productCanvasParent.transform.rotation.x, productCanvasParent.transform.rotation.y, z);

    }
}
