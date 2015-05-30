using UnityEngine;
using System.Collections;

public class toggleVis : MonoBehaviour {

    public GameObject target;

	// Use this for initialization
    public void toggle()
    {
        target.SetActive(!target.activeSelf);
        Debug.Log("Toggle Cap visibility.");
    }
}
