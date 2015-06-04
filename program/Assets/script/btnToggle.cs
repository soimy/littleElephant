using UnityEngine;
using UnityEngine.UI;

public class btnToggle : MonoBehaviour {

	public Sprite spriteOn;
	public Sprite spriteOff;

	public void toggle(){
		Image imgScript = GetComponent<Image>();
        imgScript.sprite = imgScript.sprite == spriteOn ? spriteOff : spriteOn;
	}
}
