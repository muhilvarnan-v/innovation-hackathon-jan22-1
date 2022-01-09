//using System.Collections;
//using System.Collections.Generic;
//using UnityEngine;

//public class MeasurementPrep : MonoBehaviour
//{
//    public GameObject leanObject, arSeesionOrigin,info;
    
//    public bool toggleMeasureButton = true;
//    // Start is called before the first frame update
//    void Start()
//    {
        
//    }
//    public void OnMeasureClick()
//    {
        
//        if (toggleMeasureButton)
//        {
//            //SetMeasurementObject(true);
//            //arSeesionOrigin.GetComponent<ARTap>().enabled = false;
//            OpenCanvas();
//        }
//        else
//        {
//            SetMeasurementObject(false);
//        }
//        toggleMeasureButton = !toggleMeasureButton;
//    }
//    void OpenCanvas()
//    {
//        info.SetActive(true);
//    }
//    public void OnCLickDismiss()
//    {
      
//        SetMeasurementObject(true);
//    }
//    public void SetMeasurementObject(bool flagToActivateMeasurement)
//    {
//        info.SetActive(false);
//       // arSeesionOrigin.GetComponent<ARTap>().enabled = !flagToActivateMeasurement;
//        //leanObject.SetActive(!flagToActivateMeasurement);
//        arSeesionOrigin.GetComponent<MeasurementController>().enabled=flagToActivateMeasurement;
//    }
//    // Update is called once per frame
//    void Update()
//    {
        
//    }
//}
