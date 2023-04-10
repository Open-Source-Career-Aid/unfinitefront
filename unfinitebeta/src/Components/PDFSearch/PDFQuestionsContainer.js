import React, { useState, useEffect } from "react";
import PDFQuestionBar from "./PDFQuestionBar";
import PDFQuestionInput from "./PDFQuestionInput";

// Questions and input box container on the left
function PDFQuestionsContainer({ QnA, setQnA, docid }) {
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
        />
      ))}
      <PDFQuestionInput docid={docid} QnA={QnA} setQnA={setQnA} />
    </div>
  );
}

export default PDFQuestionsContainer;
