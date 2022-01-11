using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DisclaimerButton : MonoBehaviour
{
    // Start is called before the first frame update
    public GameObject disclaimerScreen, mainScreen;
    void Start()
    {
        
    }
    public void OnClickDisclaimer()
    {
        disclaimerScreen.SetActive(false);
        mainScreen.SetActive(true);
    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
