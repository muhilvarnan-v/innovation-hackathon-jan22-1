using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FilterCategory : MonoBehaviour
{
    private AzureConnectivity connectivityScript;
    public string categoryNamePassed;
    // Start is called before the first frame update
    private void OnEnable()
    {
        connectivityScript = GameObject.Find("AzureConnection").GetComponent<AzureConnectivity>();
    }
    void Start()
    {
        
    }
    public void OnClickCategoryOption()
    {
        if(categoryNamePassed!="All Products")
        {
            Debug.Log("CategoryAPI" + APIConfiguration.publishedCategoryAPI + "/" + categoryNamePassed);
            string url = APIConfiguration.publishedCategoryAPI + "/" + categoryNamePassed;
            GameObject.Find("MenuChange").GetComponent<CategoryPanelOpenClose>().CloseAnim();
            connectivityScript.GetComponent<AzureConnectivity>().CallCoroutine(url);
        }
        else
        {
            string url = APIConfiguration.publishedCategoryAPI + "/";
            GameObject.Find("MenuChange").GetComponent<CategoryPanelOpenClose>().CloseAnim();
            connectivityScript.GetComponent<AzureConnectivity>().CallCoroutine(url);
        }
       

    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
