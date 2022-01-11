using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HotspotClick : MonoBehaviour
{
    // Start is called before the first frame update
    private bool toggleHotspot = true;

   // public Canvas can;
    Ray ray;
    RaycastHit hit;
    void Start()
    {
        //Camera gObj = GameObject.FindGameObjectWithTag("MainCamera");
       // can.GetComponent<Canvas>().worldCamera = gobj;
        Debug.Log(gameObject.name);
        Debug.Log(gameObject.transform.GetChild(0).GetChild(0).GetChild(0).gameObject.name);
    }
    public void OnClickMarkerHotspot()
    {
        Debug.Log("Enter");
        if (toggleHotspot)
            gameObject.transform.GetChild(0).GetChild(0).GetChild(0).gameObject.SetActive(true);
        else
            gameObject.transform.GetChild(0).GetChild(0).GetChild(0).gameObject.SetActive(false);

        toggleHotspot = !toggleHotspot;
    }
    // Update is called once per frame
    void LateUpdate()
    {
        //if (Input.touchCount>0)
        //{
        //    Ray ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
        //    RaycastHit hit;
        //    if (Physics.Raycast(ray, out hit))
        //    {
        //        //Select Stage
        //        if (hit.collider.name == "calloutHotspot")
        //        {
        //            if (toggleHotspot)
        //                gameObject.transform.GetChild(0).GetChild(0).GetChild(0).gameObject.SetActive(true);
        //            else
        //                gameObject.transform.GetChild(0).GetChild(0).GetChild(0).gameObject.SetActive(false);

        //            toggleHotspot = !toggleHotspot;

        //        }

        //    }

        //}
    }
}
