import React, { useState, useEffect } from "react";
import LikeDislike from "./LikeDislike";

function DisplayAnswer({ qid , answer }) {

    const [thumbs, setThumbs] = useState(0);

    useEffect(() => {

        console.log(thumbs);

    }, [thumbs]);

  // a function that takes in the answer and finds any chunk of text enclosed b/w `` and `` and highlishts it
  const highlight = (answer) => {
    let highlighted = answer.split("`").map((item, index) => {
      if (index % 2 === 0) {
        return item;
      }
      return <span className="highlight">{item}</span>;
    });
    console.log(highlighted);
    return highlighted;
  };

  const [highlighted, setHighlighted] = useState(highlight(answer));

  useEffect(() => {
    setHighlighted(highlight(answer));
  }, [answer]);

  return (
    <>
      <div className="displayanswer">
        {/* <p className="answer">{highlight}</p> */}
        <p className="answer">{highlighted}</p>
        {/* { answer ? <LikeDislike setThumbs={setThumbs} ></LikeDislike> : null} */}
      </div>
    </>
  );
}

export default DisplayAnswer;
