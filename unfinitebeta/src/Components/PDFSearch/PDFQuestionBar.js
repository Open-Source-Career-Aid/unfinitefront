import React, { useState, useEffect } from "react";
import DisplayAnswer from "./DisplayAnswer";
import answerQuestion from "../../Functions/PDFSearch/answerQuestion";

function PDFQuestionBar({ index , docid , QnA , setQnA , question , setAnswer , answer , setCurrentquestion , urls , setUrls , relevantqs , setRelevantqs }) {

  const handleQuestionClick = (event) => {
    setUrls('')
    setRelevantqs('')
    if (QnA.has(question)) {
      console.log("Question in map. No API query needed");
      setAnswer(QnA.get(question));
      setCurrentquestion(question);
    } else {
      setAnswer(answerQuestion(question, [docid]));
      setQnA((map) => new Map(map.set(question, answer)));
      console.log("Question not in map. API query complete ✅");
    }
  };

  return (
    <div key={index} onClick={handleQuestionClick} className="qinlist">
      <p>{question}</p>
    </div>
  );
}
export default PDFQuestionBar;
