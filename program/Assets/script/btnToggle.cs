using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class btnToggle : MonoBehaviour {

	public Sprite spriteOn;
	public Sprite spriteOff;

	public void toggle(){
		Image imgScript = this.GetComponent<Image>();
		if(imgScript.sprite == spriteOn)
			imgScript.sprite = spriteOff;
		else
			imgScript.sprite = spriteOn;

	}
}
