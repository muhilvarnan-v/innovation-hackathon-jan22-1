using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
public class CategoryPanelOpenClose : MonoBehaviour
{
    private bool toggleCategoryMenu = true;
    private Animator categoryPanelAnimation;
    public GameObject disabledPanel, categoryPanel;
     
    // Start is called before the first frame update
    void Start()
    {
        categoryPanelAnimation = categoryPanel.GetComponent<Animator>();
    }
    public void OnMenuClick()
    {
        if(toggleCategoryMenu)
        {
            disabledPanel.SetActive(true);
            // categoryPanel.SetActive(true);
           // categoryPanelAnimation.enabled = true;
            categoryPanelAnimation.SetBool("open", true);
        }
        else
        {
            disabledPanel.SetActive(false);
            categoryPanelAnimation.SetBool("open", false);
            StartCoroutine(Delay());
          
           
        }
        toggleCategoryMenu = !toggleCategoryMenu;
    }
   public void CloseAnim()
    {
        disabledPanel.SetActive(false);
        categoryPanelAnimation.SetBool("open", false);
        StartCoroutine(Delay());
        toggleCategoryMenu = !toggleCategoryMenu;
    }
    IEnumerator Delay()
    {
        yield return new WaitForSeconds(1);
        //categoryPanel.SetActive(false);
       // categoryPanelAnimation.enabled = false;
    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
