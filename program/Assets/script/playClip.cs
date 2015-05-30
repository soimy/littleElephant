using UnityEngine;
using System.Collections;

public class playClip : MonoBehaviour {

    public Animation anim;
    public AnimationClip animClip;
    public void playAnimClip(int index)
    {
        //anim.Play(animClip.name);
        anim.Play(anim.GetClip("lookAround").name);
        anim.PlayQueued(anim.GetClip("idle").name);
    }
}
