using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Piglet;
using System;
using Lean.Touch;
using UnityEngine.UI;

public class ImporterBehaviour : MonoBehaviour
{
    // Start is called before the first frame update
    private GltfImportTask _tsk;
    public GameObject parentObject;
    public bool isVertical=false,isRoof=false;
    public ProductInfoStorage scriptObj;
    private void Awake()
    {


    }
    void Start()
    {
         string u = scriptObj.productModel;
        ///string u = "https://ceeademocontent.azureedge.net/decor/Painting.gltf?sv=2020-08-04&ss=bf&srt=sco&sp=rltfx&se=2021-10-08T22:04:47Z&st=2021-09-24T14:04:47Z&spr=https&sig=H8wmMGO%2F1HEaacGilTlYiNCvwjD%2BvTFvgum9Dkd0yrg%3D";
         //string u = "https://apilogsstorage1.blob.core.windows.net/electronics/Bag.gltf";

        // url();
        //string u = "https://apilogsstorage1.blob.core.windows.net/fashion/Necklace.glb";
        //string url = "https://vrtdstorageaccount1.blob.core.windows.net/ceea/0.glb?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2022-06-15T14:52:25Z&st=2021-07-08T06:52:25Z&spr=https&sig=TnytkWQ%2F0ohTm1PWibiem2zLxFmwd16xXFObdFGDvBU%3D";
        // string u = "https://vrtdstorageaccount1.blob.core.windows.net/ceea/Plant.gltf?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2022-06-15T14:52:25Z&st=2021-07-08T06:52:25Z&spr=https&sig=TnytkWQ%2F0ohTm1PWibiem2zLxFmwd16xXFObdFGDvBU%3D";
        //_tsk = RuntimeGltfImporter.GetImportTask(url);
        url(u);
        //_tsk.OnProgress = OnProgress;
    }
    public void url(string ur)
    {
        string url = ur;
        _tsk = RuntimeGltfImporter.GetImportTask(url);
        _tsk.OnCompleted = OnComplete;

        //_tsk.OnProgress = OnProgress;
    }
    //private void OnProgress(GltfImportStep step, int completed, int total)
    //{
    //    throw new NotImplementedException();
    //}
    private void OnComplete(GameObject importedModel)
    {        
        importedModel.SetActive(false);
        importedModel.AddComponent<LeanPinchScale>();
        //importedModel.AddComponent<LeanDragTranslate>();
        importedModel.AddComponent<LeanTwistRotateAxis>();
        if(importedModel.GetComponent<Animation>()!=null)
        {
            var anim = importedModel.GetComponent<Animation>();
            importedModel.GetComponent<Animation>().playAutomatically = true;
            var animList = importedModel.GetComponent<AnimationList>();
            var num = animList.Clips.Count;
            if (num > 1)
            {
                for (int i = 1; i < num; i++)
                {
                    //var clipKey = animList.Clips[i].name;
                    // anim.PlayQueued(animList.Clips[i].name);
                    anim.Play(animList.Clips[i].name);
                }
            }

        }

         //controller.GetComponent<ARTap>().enabled = true;
        //controller.GetComponent<ARTap>().model = importedModel;
        if(isVertical==true)
        {
            importedModel.transform.rotation = Quaternion.Euler(90, 0, 0);
        }
        else if(isRoof==true)
        {
            importedModel.transform.rotation = Quaternion.Euler(180, 0, 0);
        }
        importedModel.transform.parent = gameObject.transform;
        //importedModel.transform.position = new Vector3(0, 0, 0);
        //importedModel.transform.rotation = Quaternion.Euler(0, 0, 0);
        //importedModel.transform.localScale = new Vector3(1, 1, 1);
        gameObject.GetComponent<HotspotConnection>().productCanvasParent = importedModel;
        gameObject.GetComponent<HotspotConnection>().enabled = true;
       
        
        

        // Note: Imported animation clips always start
        // at index 1, because index "0" is reserved for
        // the "Static Pose" clip.
        //foreach(AnimationList ani in animList)
        //{
       
        Debug.Log("Success!");
    }
    // Update is called once per frame
    void Update()
    {
        _tsk.MoveNext();
    }
}
