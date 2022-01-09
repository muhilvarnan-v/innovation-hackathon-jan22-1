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

public class CategoryOptionGenerator : MonoBehaviour
{
    string purl = APIConfiguration.categoryAPI;
   
    private CategoryData[] CategoryDataIns;
    private List<string> uniqueCategory;
    public GameObject ProductbtnPrefab, productCanvasParent;

    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(GetResponse(purl));
        uniqueCategory = new List<string>();
    }

    IEnumerator GetResponse(string url)
    {
        using (UnityWebRequest req = UnityWebRequest.Get(url))
        {
            req.SetRequestHeader("accept", "application/json;odata=fullmetadata");
            req.SetRequestHeader("content-type", "application/json;odata=fullmetadata");
            req.SetRequestHeader("x-ms-date", "Tue, 30 Aug 2013 18:10:24 GMT");
            req.SetRequestHeader("Authorization", "Basic U3VyYWo6I0Jvc2NoMTIz");

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
                CategoryDataIns = JsonConvert.DeserializeObject<CategoryData[]>(res);

                print(CategoryDataIns.Length);

                foreach (CategoryData data in CategoryDataIns)
                {
                    if(!uniqueCategory.Contains(data.categoryName))
                    {
                        uniqueCategory.Add(data.categoryName);
                    }
                   // InstantiateText(data.categoryName);
                }
                Debug.Log(uniqueCategory.Count);
                InstantiateText("All Products");
                foreach (var data in uniqueCategory)
                {
                    InstantiateText(data);
                    Debug.Log(data);
                }

            }
        }
    }


    public void InstantiateText(string categoryName)
    {
        GameObject btn = Instantiate(ProductbtnPrefab);

        btn.gameObject.transform.parent = productCanvasParent.transform;
        btn.gameObject.transform.localScale = new Vector3(1.8f, 1.5f, 0);
        btn.transform.GetChild(0).GetComponent<TMP_Text>().text = categoryName;
        btn.GetComponent<FilterCategory>().categoryNamePassed=categoryName;

     
    }
}
