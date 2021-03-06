﻿using UnityEngine;
using UnityEngine.EventSystems;
//using System.Collections;
using DG.Tweening;

public class cameraController : MonoBehaviour {

    public float drag = 0.9f;
    public float speed = 1.0f;
    public GameObject player;

    private Vector3 Point1, Point2;
    private float rotX, rotY, lastRotX, lastRotY;
	private bool dragTrigger = false;

	// Use this for initialization
	void Start () {
        rotX = rotY = 0.0f;
        transform.rotation = Quaternion.Euler(rotX, rotY, 0.0f);
	}

	// Update is called once per frame
	void Update () {
        // Exit Android program on back btn pressed
        if (Input.GetKeyDown(KeyCode.Escape))
            Application.Quit();

		// Ignore camera interaction while on UI system
		if (EventSystem.current.IsPointerOverGameObject()) return;

        // Touch drag to Rotate CamRoot
        RaycastHit hit = new RaycastHit();
        Ray ray;

        if (Input.touchCount > 0 )
        {
            // Touch began, save the position
            if(Input.GetTouch(0).phase == TouchPhase.Began&&!EventSystem.current.IsPointerOverGameObject())
            //if(Input.GetTouch(0).phase == TouchPhase.Began)
            {
                Point1 = Input.GetTouch(0).position;
				// If camera is tweening, kill it first
				if(DOTween.IsTweening(transform)){
					DOTween.Kill(transform);
				}
                lastRotX = transform.rotation.x;
                lastRotY = transform.rotation.y;
            }

            // Move finger on screen
            if (Input.GetTouch(0).phase == TouchPhase.Moved)
            {
                Point2 = Input.GetTouch(0).position;
                rotY = lastRotY + (Point2.x - Point1.x) * 90.0f / Screen.width * speed;
                rotX = lastRotX - (Point2.y - Point1.y) * 90.0f / Screen.height * speed;
                transform.rotation = Quaternion.Euler(rotX, rotY, 0.0f);
            }

            // Release finger rotate the camera back
            if (Input.GetTouch(0).phase == TouchPhase.Ended)
            {
                transform.DORotate(new Vector3(0f, 0f, 0f), 1f, RotateMode.Fast).SetEase(Ease.OutCubic);
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
		//if(Input.GetMouseButtonDown(0).Equals(true) && !EventSystem.current.IsPointerOverGameObject())
		if(Input.GetMouseButtonDown(0).Equals(true))
		{
			if(!dragTrigger) {
				Point1 = Input.mousePosition;
				lastRotX = transform.eulerAngles.x;
				lastRotY = transform.eulerAngles.y;
				dragTrigger = true;
				//Debug.Log("("+lastRotX+","+lastRotY+")");

				// If camera is tweening, kill it first
				if(DOTween.IsTweening(transform)){
					DOTween.Kill(transform);
					//this.transform.DOPause();
				}
			}
		}

		if(dragTrigger){
			// Move finger on screen
			Point2 = Input.mousePosition;
			//Debug.Log("Tracked mouse down at :" + Point2.ToString());
			rotY = lastRotY + (Point2.x - Point1.x) * 90.0f / Screen.width * speed;
			rotX = lastRotX - (Point2.y - Point1.y) * 45.0f / Screen.height * speed;
			//rotX = rotX>50?50:(rotX<-40?-40:rotX);
            transform.rotation = Quaternion.Euler(rotX, rotY, 0.0f);
		}


		if (Input.GetMouseButtonUp(0).Equals(true))
        {
			dragTrigger = false;
			Vector3 dPoint = Point2 - Point1;
			if(dPoint.magnitude < 2f){
				ray = Camera.main.ScreenPointToRay(Input.mousePosition);
				if (Physics.Raycast(ray, out hit))
					//if (hit.collider.gameObject.name == "joint18")
					if (hit.collider.gameObject.name == "joint18")
					{
						Debug.Log("Head clicked.");
						player.SendMessage("playAnimClip", 1);
					}
			}
			transform.DORotate(new Vector3(0f, 0f, 0f), 2f, RotateMode.Fast).SetEase(Ease.OutCubic);
        }
	}

	public void toggleSound() {
		AudioSource bgm = GetComponent<AudioSource>();
		bgm.mute = !bgm.mute;
	}
}
