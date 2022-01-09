using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class OrientationSelection : MonoBehaviour
{
    public GameObject importer, optionMenu, loadingText,optionMenuForHorizontal;
    // Start is called before the first frame update
    void Start()
    {
        
    }
    public void onClickVertical()
    {
        SetSceneObject(true);
        importer.GetComponent<ImporterBehaviour>().isVertical = true;
    }
    public void onClickHorizontal()
    {
        optionMenu.SetActive(false);
        optionMenuForHorizontal.SetActive(true);
    }
    public void onClickRoof()
    {
        importer.GetComponent<ImporterBehaviour>().isRoof = true;
        SetSceneObject(true);
    }
    public void OnClickGround()
    {
        SetSceneObject(true);
    }
    void SetSceneObject(bool setFlag)
    {
        optionMenu.SetActive(!setFlag);
        optionMenuForHorizontal.SetActive(!setFlag);
        loadingText.SetActive(setFlag);
        importer.SetActive(setFlag);
    }
    // Update is called once per frame
    void Update()
    {

    }
}
