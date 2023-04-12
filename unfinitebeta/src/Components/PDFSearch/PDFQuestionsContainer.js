import React, { useState, useEffect } from "react";
import PDFQuestionBar from "./PDFQuestionBar";
import PDFQuestionInput from "./PDFQuestionInput";

// Questions and input box container on the left
function PDFQuestionsContainer({ QnA , setQnA , docid , setAnswer , answer , threadid }) {
  return (
    <div className="qcontainer">
      {/* a search bar that takes in a url and a button */}
      {Array.from(QnA.keys()).map((qn, index) => (
        // {console.log(index);}
        <PDFQuestionBar
          key={index}
          index={index}
          docid={docid}
          QnA={QnA}
          setQnA={setQnA}
          question={qn}
          setAnswer={setAnswer}
          answer={answer}
        />
      ))}
      <PDFQuestionInput docid={docid} QnA={QnA} setQnA={setQnA} setAnswer={setAnswer} threadid={threadid}/>
    </div>
  );
}

export default PDFQuestionsContainer;
