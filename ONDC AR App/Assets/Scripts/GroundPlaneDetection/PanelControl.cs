using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.Video;
using System.Net;
using System.IO;

public class PanelControl : MonoBehaviour
{
    public GameObject homePanel, optionPanel,arTap,leanObject,measure,infoPanel, arSessionOrigin;
    public GameObject SpecsPanel, FeaturesPanel, ManualPanel, VideoPanel, PricePanel, PartsScript,manualText;
    private HotspotClick hot;

    public GameObject  SpecsContent;
    public GameObject VideoPlayer, PriceHeading, PriceContent;
    public ProductInfoStorage scriptObj;
    private string pdfurl;
    public GameObject model;
    private bool toggleFlag = true;
    private bool toggleMeasureButton = true,firstCLick=true,updateFlag=false;
    public GameObject childObj;
    bool feature;
   
    // Start is called before the first frame update
    void Start()
    {
        SetInfo();
    }
   
    public void OnClickSpecsButton()
    {
        bool specsenable = SpecsPanel.activeSelf;
        disableAllPanels();
        SpecsPanel.SetActive(!specsenable);
    }
    //public void OnClickFeaturesButton()
    //{
    //    bool featureEnable = FeaturesPanel.activeSelf;
    //    disableAllPanels();
    //    FeaturesPanel.SetActive(!featureEnable);

    //}
    public void OnClickManualButton()
    {
        bool manualEnable = ManualPanel.activeSelf;
        disableAllPanels();
        ManualPanel.SetActive(!manualEnable);
    }
    public void OnClickPriceButton()
    {
        bool priceEnable = PricePanel.activeSelf;
        disableAllPanels();
        PricePanel.SetActive(!priceEnable);
    }
    public void OnClickVideoButton()
    {
        bool videoEnable = VideoPanel.activeSelf;
        disableAllPanels();
        VideoPanel.SetActive(!videoEnable);
        //SetVideo();
    }
    public void OnClickFeatureButton()
    {


        // bool feature = GameObject.Find("HotspotParent").activeSelf;
        // bool feature = model.transform.FindChild("HotspotParent").gameObject.activeSelf;
        bool feature = childObj.activeSelf;
        disableAllPanels();
        childObj.SetActive(!feature);
    }
    public void OnClickMeasureButton()
    {
        if(firstCLick)
        {
            disableAllPanels();
            OpenCanvas();
            firstCLick = false;
        }
        else
        {
            Debug.Log("Flag is " + toggleMeasureButton);
            bool measureFlag = toggleMeasureButton;
            disableAllPanels();
            toggleMeasureButton = measureFlag;
            if (toggleMeasureButton)
            {
                //SetMeasurementObject(true);
                //arSeesionOrigin.GetComponent<ARTap>().enabled = false;
                OpenCanvas();
            }
            else
            {
                SetMeasurementObject(false);
            }
            toggleMeasureButton = !toggleMeasureButton;
        }
     
    }
    void OpenCanvas()
    {
        infoPanel.SetActive(true);
    }
    public void OnCLickDismiss()
    {

        SetMeasurementObject(true);
    }

    public void disableAllPanels()
    {
        Debug.Log("Child gameobject childObj" + childObj.name);
        // bool flag= measure.GetComponent<MeasurementPrep>().toggleMeasureButton;
        SpecsPanel.transform.GetChild(0).GetComponent<RectTransform>().anchoredPosition = new Vector3(0.2124328f, 218.9f, 0);
        ManualPanel.transform.GetChild(0).GetComponent<RectTransform>().anchoredPosition = new Vector3(0.2124328f, 218.9f, 0);
        //PartsScript.GetComponent<Parts>().OnPartsButtonDefault();
        SpecsPanel.SetActive(false);
        ManualPanel.SetActive(false);
        VideoPanel.SetActive(false);
        PricePanel.SetActive(false);
        infoPanel.SetActive(false);
        toggleMeasureButton =!toggleMeasureButton;
        childObj.SetActive(false);
        SetMeasurementObject(false);
        //FeaturesPanel.SetActive(false);
    }
   
    public void SetMeasurementObject(bool flagToActivateMeasurement)
    {
        infoPanel.SetActive(false);
        arSessionOrigin.GetComponent<MeasurementController>().enabled = flagToActivateMeasurement;
    }
   
    void SetInfo()
    {
        string content = "ProductName: " + scriptObj.ProductName + "\nProductDescription: " + scriptObj.productDescription + "\nProductSpecification: " + scriptObj.productSpecification + "\nProductManual: " + scriptObj.productWarranty + "\nProductFeatures: " + scriptObj.productFeatures + "\nProductCompany: " + scriptObj.productCompany + "\nProductCreated: " + scriptObj.productCreated + "\nProductAuthor: " + scriptObj.productAuthor;
        SpecsContent.GetComponent<TextMeshProUGUI>().text = content;
        //pdfurl = scriptObj.productManual;
        //model = arSeesionOrigin.GetComponent<ARTap>().model.gameObject;
        // VideoPlayer.GetComponent<VideoPlayer>().url = "https://vrtdstorageaccount1.blob.core.windows.net/vrtddata/Part1.mp4?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2022-06-15T14:52:25Z&st=2021-07-08T06:52:25Z&spr=https&sig=TnytkWQ%2F0ohTm1PWibiem2zLxFmwd16xXFObdFGDvBU%3D";
        //VideoPlayer.GetComponent<VideoPlayer>().Play();
       

    }
    public void onClickOpenUrl()
    {
        Application.OpenURL(pdfurl);
    }
    
    public void OnClickPDFDownloadButton()
    {
        StartCoroutine(pdfDownload());
        //WebClient client = new WebClient();
        //Debug.Log(Application.persistentDataPath);
        //string path = Path.Combine(Path.Combine(Application.persistentDataPath,scriptObj.ProductName+".pdf"));
        //client.DownloadFile(pdfurl, Application.persistentDataPath);
       
        // Application.OpenURL(pdfurl);
    }
    IEnumerator pdfDownload()
    {
        manualText.GetComponent<TextMeshProUGUI>().text = "";
        var www = new WWW(scriptObj.productManual);
        manualText.GetComponent<TextMeshProUGUI>().text = "Downloading Manual!";
        Debug.Log("Downloading Manual!");
        yield return www;
        File.WriteAllBytes(Application.persistentDataPath + "/"+scriptObj.ProductName+".pdf", www.bytes);
        Debug.Log(Application.persistentDataPath);
        manualText.GetComponent<TextMeshProUGUI>().text = "Download Complete";
        Debug.Log("File Saved!");
    }
    public void OnClickOptionClick()
    {
        if(toggleFlag)
        {
            ActivateOptionPanel(true);
        }
        else
        {
            disableAllPanels();
            ActivateOptionPanel(false);
        }
        toggleFlag = !toggleFlag;
    }
    public void ActivateOptionPanel(bool flag)
    {
        leanObject.SetActive(!flag);
        arSessionOrigin.GetComponent<ARTap>().enabled = !flag;
        homePanel.SetActive(!flag);
        optionPanel.SetActive(flag);
    }
    // Update is called once per frame
    void Update()
    {
        Debug.Log("Update============");
        if(model.gameObject!=null && updateFlag==false)
        {
            Debug.Log("Inside condition");
            for (int i = 0; i < model.transform.childCount ; i++)
            {
                Debug.Log("Child object"+model.transform.GetChild(i).transform.name);
                if (model.transform.GetChild(i).transform.name == "HotspotParent")
                {
                   
                    childObj = model.transform.GetChild(i).gameObject;
                    Debug.Log("Child gameobject childObj" + childObj.name);
                }
               
            }
            updateFlag = true;
        }
    }
}
