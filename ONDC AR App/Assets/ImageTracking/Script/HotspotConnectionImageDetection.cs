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

public class HotspotConnectionImageDetection : MonoBehaviour
{
    // public string purl = APIConfiguration.baseAPI+pid+APIConfiguration.hotspotExtension;
    string purl = "https://ceeacms.azure-api.net/publishedproducts/11/hotspots";
    // string purl = "https://ceeaapim.azure-api.net/myapi/products/110/hotspots/";
    // string purl = "https://ceeaapim.azure-api.net/publishedproducts/" + ClickProductBtn.id + "/hotspots/";
    //string purl = "https://ceeaapim.azure-api.net/publishedproducts/110/hotspots/";
    private HotspotData[] HotspotDataIns;

    public GameObject ProductbtnPrefab, productCanvasParent;

    public StaticLoading StaticLoadingIns;

    // Start is called before the first frame update
    void Start()
    {
        //Debug.Log(purl); GetHotspot();
    }

    public void GetHotspot(int id)
    {
        string producturl = "https://ceeacms.azure-api.net/publishedproducts/" + id + "/hotspots";
        StartCoroutine(GetResponse(producturl));
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
                if(HotspotDataIns.Length==0)
                {
                    productCanvasParent.SetActive(true);
                    StartCoroutine(Delay());
                }
                else
                {
                    foreach (HotspotData data in HotspotDataIns)
                    {
                       StaticLoadingIns.InstantiateHotspot(data.transform, data.rotation, data.scale, data.hotspotText, data.hotspotimage, data.hotspotMedia);
                        //InstantiateHotspot(data.transform, data.rotation, data.scale, data.hotspotText, data.hotspotimage, data.hotspotMedia);
                    }
                }
               

            }
        }
    }


    public void InstantiateHotspot(string transform, string rotation,string scale,string hotspotText, string productimagelink, string productmodellink)
    {
        GameObject btn = Instantiate(ProductbtnPrefab);

        btn.transform.parent = gameObject.transform;
       
        //btn.GetComponent<Button>().onClick.AddListener(OnClick);
        btn.transform.GetChild(1).GetChild(0).GetChild(0).GetChild(0).GetComponent<TextMeshProUGUI>().text = hotspotText;
        string[] hotspotPosition = transform.Split(',');
        string[] hotspotScale = scale.Split(',');
        string[] hotspotRotation = rotation.Split(',');
        for(int i=0;i<3;i++)
        {
            Debug.Log(float.Parse(hotspotPosition[i]) + "   " + float.Parse(hotspotScale[i]));
        }
        btn.transform.position = new Vector3(float.Parse(hotspotPosition[0]), float.Parse(hotspotPosition[1]), float.Parse(hotspotPosition[2]));
       // btn.transform.localScale = new Vector3(float.Parse(hotspotScale[0]), float.Parse(hotspotScale[1]), float.Parse(hotspotScale[2]));
        btn.transform.rotation =  Quaternion.Euler(0, float.Parse(rotation), 0);

        productCanvasParent.SetActive(true);
       // StartCoroutine(Delay());
       
        
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
}
