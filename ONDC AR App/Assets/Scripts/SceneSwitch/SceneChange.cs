using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SceneChange : MonoBehaviour
{
    
    // Start is called before the first frame update
    void Start()
    {
        
    }
    public void onClickMarkerButton()
    {
        // Application.LoadLevel(1);
        // can.SetActive(true);
        // mainCanvas.SetActive(false);
        Application.LoadLevel(3);
    }

    public void OnClickARButton()
    {
        Application.LoadLevel(2);
    }
    public void onHomeClick()
    {
        Application.LoadLevel(1);
    }
    public void onProductClick()
    {
        Application.LoadLevel(2);
    }
   public void OnDisclaimerClick()
    {
        Application.LoadLevel(1);
    }
    public void OnAboutClick()
    {
        Application.LoadLevel(5);
    }
    public void OnContactClick()
    {
        Application.LoadLevel(6);
    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
