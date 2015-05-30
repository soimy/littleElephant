using UnityEngine;
using System.Collections;
using DG.Tweening;

public class cameraController : MonoBehaviour {

    public float drag = 0.9f;
    public float speed = 1.0f;
    public GameObject player;

    private Vector3 Point1, Point2;
    private float rotX, rotY, lastRotX, lastRotY;

	// Use this for initialization
	void Start () {
        rotX = rotY = 0.0f;
        this.transform.rotation = Quaternion.Euler(rotX, rotY, 0.0f);
	}
	
	// Update is called once per frame
	void Update () {
        // Exit Android program on back btn pressed
        if (Input.GetKeyDown(KeyCode.Escape))
            Application.Quit(); 

        // Touch drag to Rotate CamRoot
        RaycastHit hit = new RaycastHit();
        Ray ray;
        if (Input.touchCount > 0 )
        {
            // Touch began, save the position
            if(Input.GetTouch(0).phase == TouchPhase.Began) 
            {
                Point1 = Input.GetTouch(0).position;
                lastRotX = rotX;
                lastRotY = rotY;
            }

            // Move finger on screen
            if (Input.GetTouch(0).phase == TouchPhase.Moved)
            {
                Point2 = Input.GetTouch(0).position;
                rotY = lastRotY + (Point2.x - Point1.x) * 90.0f / Screen.width * speed;
                rotX = lastRotX - (Point2.y - Point1.y) * 180.0f / Screen.height * speed;
                this.transform.rotation = Quaternion.Euler(rotX, rotY, 0.0f);
            }

            // Release finger rotate the camera back
            if (Input.GetTouch(0).phase == TouchPhase.Ended)
            {
                this.transform.DORotate(new Vector3(0f, 0f, 0f), 1f, RotateMode.Fast).SetEase(Ease.OutCubic);
                //lastRotX = lastRotY = 0f;
                rotX = rotY = 0f;
                if (Input.GetTouch(0).deltaPosition.magnitude < 5f)
                {
                    
                    ray = Camera.main.ScreenPointToRay(Input.GetTouch(0).position);
                    if(Physics.Raycast(ray, out hit))
                        if (hit.collider.gameObject.name == "joint18")
                        {
                            Debug.Log("Head clicked.");
                            player.SendMessage("playAnimClip", 1);
                        }
                }
            }
        }

        // Mouse Drag to Rotate CamRoot
        // TODO
        if (Input.GetMouseButtonUp(0).Equals(true))
        {
            ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            if (Physics.Raycast(ray, out hit))
                //if (hit.collider.gameObject.name == "joint18")
                {
                    Debug.Log("Head clicked.");
                    player.SendMessage("playAnimClip", 1);
                }
        }
	}
}
