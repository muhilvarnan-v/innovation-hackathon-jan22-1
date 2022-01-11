using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using TMPro;
using Piglet;
using Lean.Touch;

[RequireComponent(typeof(ARTrackedImageManager))]

public class StaticLoading : MonoBehaviour
{

    [SerializeField]
    // private TMP_Text imageTrackedText, addT, updateT, removeT, updateImageName;
    private TMP_Text addT, updateT;
    [SerializeField]
    private GameObject[] arObjectsToPlace;

    private GameObject m_SpawnedOnePrefab, m_SpawnedTwoPrefab, m_SpawnedThreePrefab, m_SpawnedFourPrefab, m_SpawnedFivePrefab;

    [SerializeField]
    private Vector3 scaleFactor = new Vector3(0.1f, 0.1f, 0.1f);

    private ARTrackedImageManager m_TrackedImageManager;

    private Dictionary<string, GameObject> arObjects = new Dictionary<string, GameObject>();

    private GltfImportTask _tsk;

    private bool isdownloading;

    private string detectedModel;

    public GameObject hotspotpfb;

    public HotspotConnectionImageDetection HotspotConnectionIns;

    public int pid;

    void Awake()
    {
        m_TrackedImageManager = GetComponent<ARTrackedImageManager>();
    }

    private void Start()
    {
        isdownloading = false;
    }

    private void Update()
    {
        if (isdownloading)
            _tsk.MoveNext();

    }

    void OnEnable()
    {
        m_TrackedImageManager.trackedImagesChanged += OnTrackedImagesChanged;
    }

    void OnDisable()
    {
        m_TrackedImageManager.trackedImagesChanged -= OnTrackedImagesChanged;
    }

    private string sofaurl = "https://ceeademocontent.azureedge.net/furniture/Sofa.glb?sv=2020-08-04&ss=bf&srt=sco&sp=rltfx&se=2021-10-08T22:04:47Z&st=2021-09-24T14:04:47Z&spr=https&sig=H8wmMGO%2F1HEaacGilTlYiNCvwjD%2BvTFvgum9Dkd0yrg%3D";
    private string tableurl = "https://apilogsstorage1.blob.core.windows.net/furniture/TableChair.gltf";
    private string paintingurl = "https://ceeademocontent.azureedge.net/decor/Painting.gltf?sv=2020-08-04&ss=bf&srt=sco&sp=rltfx&se=2021-10-08T22:04:47Z&st=2021-09-24T14:04:47Z&spr=https&sig=H8wmMGO%2F1HEaacGilTlYiNCvwjD%2BvTFvgum9Dkd0yrg%3D";
    private string rug = "https://ceeademocontent.azureedge.net/decor/Rug.glb?sv=2020-08-04&ss=bf&srt=sco&sp=rltfx&se=2021-10-08T22:04:47Z&st=2021-09-24T14:04:47Z&spr=https&sig=H8wmMGO%2F1HEaacGilTlYiNCvwjD%2BvTFvgum9Dkd0yrg%3D";
    private string planrurl = "https://ceeademocontent.azureedge.net/decor/Plant.gltf?sv=2020-08-04&ss=bf&srt=sco&sp=rltfx&se=2021-10-08T22:04:47Z&st=2021-09-24T14:04:47Z&spr=https&sig=H8wmMGO%2F1HEaacGilTlYiNCvwjD%2BvTFvgum9Dkd0yrg%3D";
    int add, update, remove;

    private Vector3 pos;

    void OnTrackedImagesChanged(ARTrackedImagesChangedEventArgs eventArgs)
    {
        /* foreach (ARTrackedImage trackedImage in eventArgs.added)
         {
             add++;
             addT.text = add.ToString();
             updateImageName.text = trackedImage.referenceImage.name;
             UpdateARImage(trackedImage);
         }

         foreach (ARTrackedImage trackedImage in eventArgs.updated)
         {
             update++;

             updateT.text = update.ToString();

             UpdateARImage(trackedImage);
         }

         foreach (ARTrackedImage trackedImage in eventArgs.removed)
         {
             arObjects[trackedImage.name].SetActive(false);
             imageTrackedText.text = "none";
             remove++;
             removeT.text = remove.ToString();
         }*/
        if (!isdownloading)
        {
            foreach (ARTrackedImage trackedImage in eventArgs.added)
            {
               // addT.text = trackedImage.referenceImage.name;

                switch (trackedImage.referenceImage.name)
                {

                    case "Painting":
                        // m_SpawnedOnePrefab = Instantiate(arObjectsToPlace[0], trackedImage.transform.position, trackedImage.transform.rotation);
                        pos = trackedImage.transform.position;
                        pid = 11;
                        detectedModel = trackedImage.referenceImage.name;
                        if (m_SpawnedOnePrefab == null)
                        {
                            url(paintingurl);
                            isdownloading = true;
                        }
                        m_SpawnedOnePrefab.SetActive(true);
                        break;

                    case "Sofa":
                        // m_SpawnedTwoPrefab = Instantiate(arObjectsToPlace[1], trackedImage.transform.position, trackedImage.transform.rotation);
                        pos = trackedImage.transform.position;
                        pid = 12;
                        detectedModel = trackedImage.referenceImage.name;
                        if (m_SpawnedTwoPrefab == null )
                        {
                            url(sofaurl);
                            isdownloading = true;
                        }
                        m_SpawnedTwoPrefab.SetActive(true);
                        break;

                    case "TableChair":
                        // m_SpawnedThreePrefab = Instantiate(arObjectsToPlace[2], trackedImage.transform.position, trackedImage.transform.rotation);
                        pos = trackedImage.transform.position;
                        pid = 15;
                        detectedModel = trackedImage.referenceImage.name;
                        if (m_SpawnedThreePrefab == null)
                        {
                            url(tableurl);
                            isdownloading = true;
                        }
                        m_SpawnedThreePrefab.SetActive(true);
                        break;

                    case "Rug":
                        // m_SpawnedThreePrefab = Instantiate(arObjectsToPlace[2], trackedImage.transform.position, trackedImage.transform.rotation);
                        pos = trackedImage.transform.position;
                        pid = 13;
                        detectedModel = trackedImage.referenceImage.name;
                        if (m_SpawnedFourPrefab == null)
                        {
                            url(rug);
                            isdownloading = true;
                        }
                        m_SpawnedFourPrefab.SetActive(true);
                        break;

                    case "Plant":
                        // m_SpawnedThreePrefab = Instantiate(arObjectsToPlace[2], trackedImage.transform.position, trackedImage.transform.rotation);
                        pos = trackedImage.transform.position;
                        pid = 13;
                        detectedModel = trackedImage.referenceImage.name;
                        if (m_SpawnedFivePrefab == null)
                        {
                            url(planrurl);
                            isdownloading = true;
                        }
                        m_SpawnedFivePrefab.SetActive(true);
                        break;
                }
            }


            foreach (ARTrackedImage trackedImage in eventArgs.updated)
            {
                // image is tracking or tracking with limited state, show visuals and update it's position and rotation
                if (trackedImage.trackingState == TrackingState.Tracking)
                {

                   // updateT.text = "Tracking..." + trackedImage.referenceImage.name;

                    switch (trackedImage.referenceImage.name)
                    {

                        case "Painting":
                            m_SpawnedOnePrefab.SetActive(true);
                            m_SpawnedOnePrefab.transform.SetPositionAndRotation(trackedImage.transform.position, trackedImage.transform.rotation);
                            pos = trackedImage.transform.position;
                            //url(Murl);
                            //isdownloading = true;
                            break;

                        case "Sofa":
                            m_SpawnedTwoPrefab.SetActive(true);
                            m_SpawnedTwoPrefab.transform.SetPositionAndRotation(trackedImage.transform.position, trackedImage.transform.rotation);
                            pos = trackedImage.transform.position;
                            //url(Murl);
                            //isdownloading = true;
                            break;

                        case "TableChair":
                            m_SpawnedThreePrefab.SetActive(true);
                            m_SpawnedThreePrefab.transform.SetPositionAndRotation(trackedImage.transform.position, trackedImage.transform.rotation);
                            pos = trackedImage.transform.position;
                            //  url(Murl);
                            //isdownloading = true;
                            break;

                        case "Rug":
                            m_SpawnedFourPrefab.SetActive(true);
                            m_SpawnedFourPrefab.transform.SetPositionAndRotation(trackedImage.transform.position, trackedImage.transform.rotation);
                            pos = trackedImage.transform.position;
                            //  url(Murl);
                            //isdownloading = true;
                            break;

                        case "Plant":
                            m_SpawnedFivePrefab.SetActive(true);
                            m_SpawnedFivePrefab.transform.SetPositionAndRotation(trackedImage.transform.position, trackedImage.transform.rotation);
                            pos = trackedImage.transform.position;
                            //  url(Murl);
                            //isdownloading = true;
                            break;
                    }
                }
                // image is no longer tracking, disable visuals TrackingState.Limited TrackingState.None
                else
                {

                    updateT.text = "" ;

                    switch (trackedImage.referenceImage.name)
                    {

                        case "Painting":
                            m_SpawnedOnePrefab.SetActive(false);
                            break;

                        case "Sofa":
                            m_SpawnedTwoPrefab.SetActive(false);
                            break;

                        case "TableChair":
                            m_SpawnedThreePrefab.SetActive(false);
                            break;

                        case "Rug":
                            m_SpawnedFourPrefab.SetActive(false);
                            break;

                        case "Plant":
                            m_SpawnedFivePrefab.SetActive(false);
                            break;
                    }
                }

            }
        }
    }
    public void url(string ur)
    {
        string url = ur;
        addT.text = "Downloading...";
        _tsk = RuntimeGltfImporter.GetImportTask(url);
        _tsk.OnCompleted = OnComplete;
    }

    private void OnComplete(GameObject importedModel)
    {
        addT.text = "";
        importedModel.transform.localScale = new Vector3(0.1f, 0.1f, 0.1f);

        importedModel.tag = "Model";
        var modelName = detectedModel;
        importedModel.AddComponent<LeanPinchScale>();
        //importedModel.AddComponent<LeanDragTranslate>();
        importedModel.AddComponent<LeanTwistRotateAxis>();
        switch (modelName)
        {
            case "Painting":
                m_SpawnedOnePrefab = importedModel;
                break;
            case "Sofa":
                m_SpawnedTwoPrefab = importedModel;
                break;
            case "TableChair":
                m_SpawnedThreePrefab = importedModel;
                break;
            case "Rug":
                m_SpawnedFourPrefab = importedModel;
                break;
            case "Plant":
                m_SpawnedFivePrefab = importedModel;
                break;
        }

        if (importedModel.GetComponent<Animation>() != null)
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

        HotspotConnectionIns.GetHotspot(pid);

        isdownloading = false;
    }
    public void InstantiateHotspot(string transform, string rotation, string scale, string hotspotText, string productimagelink, string productmodellink)
    {
        updateT.text += "InstantiateHotspot...";
        pos = pos + new Vector3(0.0f, 0.10f, -0.0f);
        GameObject btn = Instantiate(hotspotpfb, pos, Quaternion.Euler(0, float.Parse(rotation), 0));
        btn.tag = "hotspot";
        btn.transform.localScale = new Vector3(0.01f, 0.01f, 0.01f);
        var modelName = detectedModel;
        addT.text = modelName+"";
        btn.transform.parent = gameObject.transform;
        btn.transform.GetChild(1).GetChild(0).GetChild(0).GetChild(0).GetComponent<TextMeshProUGUI>().text = hotspotText;
        string[] hotspotPosition = transform.Split(',');
        string[] hotspotScale = scale.Split(',');
        string[] hotspotRotation = rotation.Split(',');

       // btn.transform.position = new Vector3(float.Parse(hotspotPosition[0]), float.Parse(hotspotPosition[1]), float.Parse(hotspotPosition[2]));
        btn.transform.rotation = Quaternion.Euler(0, float.Parse(rotation), 0);


        switch (modelName)
        {
            case "Painting":
                btn.transform.parent = m_SpawnedOnePrefab.transform;
                break;
            case "Sofa":
                btn.transform.parent = m_SpawnedTwoPrefab.transform;
                break;
            case "TableChair":
                btn.transform.parent = m_SpawnedThreePrefab.transform;
                break;
            case "Rug":
                btn.transform.parent = m_SpawnedFourPrefab.transform;
                break;
            case "Plant":
                btn.transform.parent = m_SpawnedFivePrefab.transform;
                break;
        }

        addT.text = "";
        updateT.text = "";
    }

    //private void UpdateARImage(ARTrackedImage trackedImage)
    //{
    //    // Display the name of the tracked image in the canvas
    //    imageTrackedText.text = trackedImage.referenceImage.name;

    //    // Assign and Place Game Object
    //    AssignGameObject(trackedImage.referenceImage.name, trackedImage.transform.position);

    //    Debug.Log($"trackedImage.referenceImage.name: {trackedImage.referenceImage.name}");
    //}

    //void AssignGameObject(string name, Vector3 newPosition)
    //{
    //    if (arObjectsToPlace != null)
    //    {
    //        GameObject goARObject = arObjects[name];
    //        goARObject.SetActive(true);
    //        goARObject.transform.position = newPosition;
    //        goARObject.transform.localScale = scaleFactor;
    //        foreach (GameObject go in arObjects.Values)
    //        {
    //            Debug.Log($"Go in arObjects.Values: {go.name}");
    //            if (go.name != name)
    //            {
    //                go.SetActive(false);
    //            }
    //        }
    //    }
    //}
}
