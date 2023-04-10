import React, { useState, useEffect } from "react";
import PDFQuestionBar from "./PDFQuestionBar";
import PDFQuestionInput from "./PDFQuestionInput";

// Questions and input box container on the left
function PDFQuestionsContainer({ QnA, setQnA }) {
  return (
    <div className="qcontainer">
      {/* a search bar that takes in a url and a button */}
      {Array.from(QnA.keys()).map((qn, index) => (
        // {console.log(index);}
        <PDFQuestionBar key={index} index={index} question={qn} />
      ))}
      <PDFQuestionInput QnA={QnA} setQnA={setQnA} />
    </div>
  );
}

export default PDFQuestionsContainer;
