using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;

public class ImageRecognition : MonoBehaviour
{
    private ARTrackedImageManager arImageTracker;

    private void Awake()
    {
        arImageTracker = FindObjectOfType<ARTrackedImageManager>();
    }
    private void OnEnable()
    {
        arImageTracker.trackedImagesChanged += OnImageChange;
    }
    private void OnDisable()
    {
        arImageTracker.trackedImagesChanged -= OnImageChange;
    }
    public void OnImageChange(ARTrackedImagesChangedEventArgs args)
    {
        foreach(var trackedImage in args.added)
        {
            Debug.Log(trackedImage.name);
        }
    }
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
