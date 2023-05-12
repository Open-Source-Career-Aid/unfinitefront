import React, { useState, useEffect } from "react";
import AnswerComplexity from "./AnswerComplexity";
import LikeDislike from "./LikeDislike";

function renderTextWithKPsandCitations( { answer , handleQuestionclick , setQuestions , handleKPclick , urls , setUrls , relevantqs , setRelevantqs } ) {

  let parts = [];
  let subparts = [];
  let something = '';
  let text = '';
  let tempurls = '';

  if (!answer) {
    return null; // or return an empty array or default value
  }

  // find >>>PART<<< in answer and split it into parts
  something = answer.split(/(>>>.*?<<<)/);
  // remove entries if length is 0
  something = something.filter(function (el) {
    return el.length != 0;
  });
  // console.log(something);
  text = something[0];

  try {
    if (something[1]==='>>>PART<<<' && urls!==something[2]) {
      tempurls = something[2];
      // if urls is not null
        setUrls(tempurls);
        // console.log(tempurls, 'ysysysy');
      // // if relevantqs is not null
      // if (relevantqs === '') {
      //   setRelevantqs(something[4]);
      //   // console.log(something[4], 'ysysysy');
      // }
    }
  } catch (error) {
    console.log(error);
  }

  try {
    if (something[3]==='>>>PART<<<' && relevantqs!==something[4]) {
      // if relevantqs is not null
        setRelevantqs(something[4]);
        // console.log(something[4], 'ysysysy');
    }
  }
  catch (error) {
    console.log(error);
  }

  const answerChunks = text.split(/(\[.*?\])/);

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
      } else if (part.startsWith("[") && part.endsWith("]")) {
        // remove the unnecessary part after [ and before # if it exists
        let citation = part.slice(1, -1);
        if (citation.includes("#")) {
          citation = citation.split("#")[1];
        }
        // add [] back to the citation
        citation = "[" + citation + "]";
        return <span key={index} className="citation">{citation}</span>;
      } else {
        return part;
      }
    }).filter(part => part !== null) // filter out empty strings
  );
}

function renderURLs( { urls } ) {

  let parts = [];

  if (!urls) {
    return null; // or return an empty array or default value
  }

  let text = urls

  // split by <url> and </url>
  const answerChunks = text.split(/(<url>.*?<\/url>)/);

  answerChunks.forEach((part, index) => {

    if (part.startsWith("<url>") && part.endsWith("</url>")) {
      // remove <url> and </url>
      part = part.slice(5, -6);

      // break url into it's parent domain
      let url = new URL(part);
      let domain = url.hostname;

      // push the domaun and url to parts as a list item
      parts.push([domain, part]);
    }

  });

  return (
    parts.map((part, index) => {
      return <a key={index} className="urlreference" href={part[1]} target="_blank" ><span className="urlreference-index">{index+1}</span>{part[0]}</a>;
    })
  );
}

function renderRelevantQs( { relevantqs , handleQuestionclick } ) {

  let parts = [];

  if (!relevantqs) {
    return null; // or return an empty array or default value
  }

  let text = relevantqs

  // split by next line
  const answerChunks = text.split(/\n/);
  // remove entries if length is 0
  answerChunks.forEach((part, index) => {

    if (part.length !== 0) {
      // remove the first word
      part = part.split(" ").slice(1).join(" ");
      parts.push(part);
    }

  });

  return (
    parts.map((part, index) => {
      return <div key={index} className="qs" onClick={handleQuestionclick}>{part}</div>;
    })
  );
}

function DisplayAnswer({ qid , answer , nextquestion , setNextquestion , currentquestion , urls , setUrls , relevantqs , setRelevantqs }) {

    const [thumbs, setThumbs] = useState(0);
    const [specialresponse, setSpecialresponse] = useState(null);
    const [questions , setQuestions] = useState([]);
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

    // useEffect(() => {
    //     console.log('urls', urls);
    // }, [urls]);

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
        <p className="question">
          {currentquestion}
        </p>
        <AnswerComplexity setSpecialresponse={setSpecialresponse} />
          <p className="answer">
            {renderTextWithKPsandCitations({ answer , handleQuestionclick , setQuestions , handleKPclick , urls , setUrls , relevantqs , setRelevantqs })}
          </p>
          {/* <div className="references">References</div> */}
          <div className="references-container">
            {renderURLs({ urls })}
          </div>
          <div className="relevant-questions-container">
            <div className="relevant-questions">
              <div className="relevant-questions-title">Relevant Questions</div>
              {renderRelevantQs({ relevantqs , handleQuestionclick })}
            </div>
          </div>
      </div>
    </>
  );
}

export default DisplayAnswer;
