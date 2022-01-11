using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;


public class ARTap : MonoBehaviour
{
    public GameObject model,measure,panelControl;

    private GameObject spawnedObject;
    private ARRaycastManager _arRayCast;
    private Vector2 touchPosition;

    static List<ARRaycastHit> hits = new List<ARRaycastHit>();
    // Start is called before the first frame update
    private void Awake()
    {
        _arRayCast = GetComponent<ARRaycastManager>();
    }
    bool TryGetTouchPosition(out Vector2 touchPosition)
    {
        if(Input.touchCount>0)
        {
            touchPosition = Input.GetTouch(index: 0).position;
            return true;
        }
        touchPosition = default;
        return false;
    }
    private void Update()
    {if(Input.GetKeyDown(KeyCode.L))
        {
            panelControl.GetComponent<PanelControl>().model = model;
           // panelControl.GetComponent<PanelControl>().enabled = true;
            measure.SetActive(true);
        }
        if (!TryGetTouchPosition(out Vector2 touchPosition))
            return;
        if(_arRayCast.Raycast(touchPosition,hits,trackableTypes:TrackableType.PlaneWithinPolygon))
        {
            var hitPos = hits[0].pose;

            if(spawnedObject== null)
            {
               
                spawnedObject = Instantiate(model, hitPos.position, Quaternion.Euler(0,0,0));
                panelControl.GetComponent<PanelControl>().model = spawnedObject;
               // gameObject.GetComponent<ARTap>().enabled = false;
                //panelControl.GetComponent<PanelControl>().enabled = true;
                measure.SetActive(true);
            }
            else
            {
                spawnedObject.transform.position = hitPos.position;
            }
        }
    }
}
