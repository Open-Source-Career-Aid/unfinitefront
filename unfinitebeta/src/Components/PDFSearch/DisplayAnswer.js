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

// function renderTextWithKPs( { answer , handleQuestionclick , setQuestions } ) {

//   let parts = [];
//   let subparts = [];

//   if (!answer) {
//     return null; // or return an empty array or default value
//   }

//   const answerChunks = answer.split(/({.*?})/);

//   answerChunks.forEach((part, index) => {

//     subparts = part.split(/(<kp>.*?<\/kp>)/);

//     subparts.forEach((subpart, index) => {

//       console.log(subpart);

//       parts.push(subpart);

//     });

//   });


//   return(
//     parts.map((part, index) => {
//     console.log(part);
//     if (part.startsWith("<kp>") && part.endsWith("</kp>")) {
//       return <span key={index} className="kp" onClick={handleQuestionclick}>{part.slice(4, -5)}</span>;
//     } else if (part.startsWith("{") && part.endsWith("}")) {
//       // pass this part
//       return
//     } else {
//       return part;
//     }
//   }
  
//   ));
// }

function renderTextWithKPs( { answer , handleQuestionclick , setQuestions , handleKPclick } ) {

  let parts = [];
  let subparts = [];

  if (!answer) {
    return null; // or return an empty array or default value
  }

  const answerChunks = answer.split(/({.*?})/);

  answerChunks.forEach((part, index) => {

    subparts = part.split(/(<kp>.*?<\/kp>)/);

    subparts.forEach((subpart, index) => {

      // console.log(subpart);

      parts.push(subpart);

    });

  });

  return (
    parts.map((part, index) => {
      // console.log(part);
      if (part.startsWith("<kp>") && part.endsWith("</kp>")) {
        return <span key={index} className="kp" onClick={handleKPclick}>{part.slice(4, -5)}</span>;
      } else if (part.startsWith("{") && part.endsWith("}")) {
        // pass this part
        return null;
      } else {
        return part;
      }
    }).filter(part => part !== null) // filter out empty strings
  );
}


function renderTextWithQs( { answer , handleQuestionclick , setQuestions , relevantqs , setRelevantqs } ) {

  let parts = [];
  let subparts = [];

  if (!answer) {
    return null; // or return an empty array or default value
  }

  const answerChunks = answer.split(/({.*?})/);

  answerChunks.forEach((part, index) => {

    subparts = part.split(/(<q>.*?<\/q>)/);

    subparts.forEach((subpart, index) => {

      // console.log(subpart);

      parts.push(subpart);

    });

  });


  return(
    parts.map((part, index) => {
    // console.log(part);
    if (part.startsWith("<kp>") && part.endsWith("</kp>")) {
      // return <span key={index} className="q" onClick={handleQuestionclick}>{part.slice(3, -4)}</span>;
      return
    } else if (part.startsWith("{") && part.endsWith("}")) {
      if (relevantqs===false) {
        setRelevantqs(true);
      }
      // setQuestions((questions) => [...questions, part.slice(1, -1)]);
      return <div className="relevant-questions-container">Q. <span key={index} className="qs" onClick={handleQuestionclick} style={{'margin-left':'5px'}}>{part.slice(1, -1)}</span></div>;
    } else {
      // return part;
      return
    }
  }
  
  ));

}

function DisplayAnswer({ qid , answer , nextquestion , setNextquestion , currentquestion }) {

    const [thumbs, setThumbs] = useState(0);
    const [specialresponse, setSpecialresponse] = useState(null);
    const [questions , setQuestions] = useState([]);
    const [relevantqs , setRelevantqs] = useState(false);
    let displayanswer = null;

    // find questions in the answer that are encapsulated by curly braces and return an array of the text not in curly braces and the text in curly braces
    // const findQs = (text) => {
    //     const regex = /{([^}]+)}/g;
    //     const matches = text.match(regex);
    //     const qids = [];
    //     if (matches) {
    //         matches.forEach((match) => {
    //             qids.push(match.slice(1, -1));
    //         });
    //     }
    //     return qids;
    // };

    // set displayanswer to the answer without the questions in curly braces
    // const highlight = (text) => {
    //     const regex = /{([^}]+)}/g;
    //     const matches = text.match(regex);
    //     const qids = [];
    //     if (matches) {
    //         matches.forEach((match) => {
    //             qids.push(match.slice(1, -1));
    //         });
    //     }
    //     let displayanswer = text;
    //     qids.forEach((qid) => {
    //         displayanswer = displayanswer.replace(`{${qid}}`, "");
    //     });

    //     // strip the displayanswer of unnecessary spaces
    //     // displayanswer = displayanswer.replace(/\s+/g, " ").trim();

    //     // strip the unnecessary spaces from the start and end of the displayanswer
    //     displayanswer = displayanswer.trim();

    //     // replace a space if len of the space is greater than 1 with a single space
    //     // displayanswer = displayanswer.replace(/\s{2,}/g, " ");

    //     return displayanswer;
    // };

    useEffect(() => {
        console.log(thumbs);
    }, [thumbs]);

    const handleQuestionclick = (event) => {
        console.log(event.target.innerText);
        setRelevantqs(false);
        setNextquestion(event.target.innerText);
    };

    const handleKPclick = (event) => {
        setRelevantqs(false);
        setNextquestion("What is "+event.target.innerText+"?");
    };

    useEffect(() => {

      if (specialresponse !== null) {
        // use selectedid to get the question from the QnA object which is a map of questions and answers

        // console.log(currentquestion, specialresponse);
        const specialQuestion = currentquestion.split('sr:')[0] + " sr:" + specialresponse;
        // setNextquestion(specialresponse);
        // console.log(specialQuestion);
        setRelevantqs(false);
        setNextquestion(specialQuestion);

      }

    }, [specialresponse]);

    useEffect(() => {

      setSpecialresponse(null);

    }, [currentquestion]);

  return (
    <>
      <div className="displayanswer">
        {/* <p className="title">{title}</p> */}
        <p className="question">
          {currentquestion}
        </p>
        <AnswerComplexity setSpecialresponse={setSpecialresponse} />
        {/* <p className="answer"> */}
          {/* {highlight(answer)} */}
          <p className="answer">
          {/* {answer} */}
          {renderTextWithKPs({ answer , handleQuestionclick , setQuestions , handleKPclick })}
          </p>
          <div className="relevant-questions">
          {relevantqs ? <> <p className="relevant-questions-title">Relevant questions</p> </> : null}
          {renderTextWithQs({ answer , handleQuestionclick , setQuestions , relevantqs , setRelevantqs })}
          </div>
          {/* </p> */}
        {/* {findQs(answer).map((qid) => {
          return <p className="answer">{"Q. "}<span className="qs" onClick={handleQuestionclick}>{qid}</span></p>;
        }
        )} */}
        {/* { answer ? <LikeDislike setThumbs={setThumbs} ></LikeDislike> : null} */}
      </div>
    </>
  );
}

export default DisplayAnswer;
