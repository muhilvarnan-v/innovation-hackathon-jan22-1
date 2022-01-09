using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using Newtonsoft.Json;
public class RandomScript : MonoBehaviour
{
    public string purl = "https://ceeacms.azure-api.net/content/furniture/Sofa.jpg";
    string res;
    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(GetResponse(purl));
    }
    public IEnumerator GetResponse(string url)
    {

        if (url != null && url.Contains("jpeg") || url.Contains("JPG") || url.Contains("jpg"))
        {
            var www = new UnityWebRequest(url, "GET");

            www.SetRequestHeader("Cache-Control", "max-age=0, no-cache, no-store");
            www.SetRequestHeader("Pragma", "no-cache");
            www.SetRequestHeader("Authorization", "Basic U3VyYWo6I0Jvc2NoMTIz");
            www.downloadHandler = new DownloadHandlerTexture();

            yield return www.SendWebRequest();

            if (www.isDone)
            {
                Debug.Log("Done");
                Texture2D tex = DownloadHandlerTexture.GetContent(www);
                gameObject.GetComponent<Image>().sprite = Sprite.Create(tex, new Rect(0, 0, tex.width, tex.height), new Vector2(0, 0));
            }
            yield return new WaitForSeconds(0.2f);
        }
    }


    // Update is called once per frame
    void Update()
    {
        
    }
}
