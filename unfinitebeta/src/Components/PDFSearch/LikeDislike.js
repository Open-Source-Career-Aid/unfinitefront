import React, { useState, useEffect } from "react";
import likeDislikeAnswer from "../../Functions/PDFSearch/likeDislikeAnswer";
import "../../css/Archiv/likeDislike.css";

function LikeDislike({ answer }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeButtonClass, setLikeButtonClass] = useState("like-btn");
  const [dislikeButtonClass, setDislikeButtonClass] = useState("dislike-btn");

  const likeBtnHandler = () => {
    // const resp = await likeDislikeAnswer(1);
    setLiked(!liked);
    setDisliked(disliked ? !disliked : disliked);
  };
  const dislikeBtnHandler = () => {
    // const resp = await likeDislikeAnswßer(2);
    setLiked(liked ? !liked : liked);
    setDisliked(!disliked);
  };
  useEffect(() => {
    liked ? console.log("Liked!") : console.log("Unliked");
    setLikeButtonClass(liked ? "liked" : "like-btn");
  }, [liked]);

  useEffect(() => {
    disliked ? console.log("Disliked!") : console.log("Removed dislike");
    setDislikeButtonClass(disliked ? "disliked" : "dislike-btn");
  }, [disliked]);

  return (
    <div className="like-dislike">
      <button class={likeButtonClass} onClick={likeBtnHandler}></button>
      <button class={dislikeButtonClass} onClick={dislikeBtnHandler}></button>
    </div>
  );
}

export default LikeDislike;
