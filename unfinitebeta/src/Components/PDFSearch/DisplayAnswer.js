import React, { useState, useEffect } from "react";
// import AnswerComplexity from "./AnswerComplexity";
import LikeDislike from "./LikeDislike";

// function findQs(text) {
//   // finds the strings that are encapsulated by curly braces and returns a render of the whole text with the strings in curly braces highlighted
//   const regex = /{([^}]+)}/g;
//   const matches = text.match(regex);
//   const qids = [];
//   if (matches) {
//     matches.forEach((match) => {
//       qids.push(match.slice(1, -1));
//     });
//   }
//   return qids;
// }


function DisplayAnswer({ qid , answer }) {

    const [thumbs, setThumbs] = useState(0);
    let displayanswer = null;

    // find questions in the answer that are encapsulated by curly braces and return an array of the text not in curly braces and the text in curly braces
    const findQs = (text) => {
        const regex = /{([^}]+)}/g;
        const matches = text.match(regex);
        const qids = [];
        if (matches) {
            matches.forEach((match) => {
                qids.push(match.slice(1, -1));
            });
        }
        return qids;
    };

    // set displayanswer to the answer without the questions in curly braces
    const highlight = (text) => {
        const regex = /{([^}]+)}/g;
        const matches = text.match(regex);
        const qids = [];
        if (matches) {
            matches.forEach((match) => {
                qids.push(match.slice(1, -1));
            });
        }
        let displayanswer = text;
        qids.forEach((qid) => {
            displayanswer = displayanswer.replace(`{${qid}}`, "");
        });

        // strip the displayanswer of unnecessary spaces
        // displayanswer = displayanswer.replace(/\s+/g, " ").trim();

        // strip the unnecessary spaces from the start and end of the displayanswer
        displayanswer = displayanswer.trim();

        return displayanswer;
    };

    useEffect(() => {
        console.log(thumbs);
    }, [thumbs]);

    const handleQuestionclick = (event) => {
        console.log(event.target.innerText);
    };

  return (
    <>
      <div className="displayanswer">
        {/* <AnswerComplexity /> */}
        {/* <p className="answer">{highlight}</p> */}
        {/* <p className="answer">{answer}</p> */}
        {/* {findQs(answer).map((qid) => {
          return <p className="qid">{qid}</p>;
        }
        )} */}
        <p className="answer">{highlight(answer)}</p>
        {findQs(answer).map((qid) => {
          return <p className="answer">{"Q. "}<span className="qs" onClick={handleQuestionclick}>{qid}</span></p>;
        }
        )}
        {/* { answer ? <LikeDislike setThumbs={setThumbs} ></LikeDislike> : null} */}
      </div>
    </>
  );
}

export default DisplayAnswer;
