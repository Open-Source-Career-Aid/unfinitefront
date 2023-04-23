import React, { useState, useEffect } from "react";
import AnswerComplexity from "./AnswerComplexity";
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


function DisplayAnswer({ qid , answer , nextquestion , setNextquestion , currentquestion }) {

    const [thumbs, setThumbs] = useState(0);
    const [specialresponse, setSpecialresponse] = useState(null);
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

        // replace a space if len of the space is greater than 1 with a single space
        // displayanswer = displayanswer.replace(/\s{2,}/g, " ");

        return displayanswer;
    };

    useEffect(() => {
        console.log(thumbs);
    }, [thumbs]);

    const handleQuestionclick = (event) => {
        console.log(event.target.innerText);
        setNextquestion(event.target.innerText);
    };

    useEffect(() => {

      if (specialresponse !== null) {
        // use selectedid to get the question from the QnA object which is a map of questions and answers

        // console.log(currentquestion, specialresponse);
        const specialQuestion = currentquestion.split('sr:')[0] + " sr:" + specialresponse;
        // setNextquestion(specialresponse);
        // console.log(specialQuestion);
        setNextquestion(specialQuestion);

      }

    }, [specialresponse]);

  return (
    <>
      <div className="displayanswer">
        <AnswerComplexity setSpecialresponse={setSpecialresponse} />
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
