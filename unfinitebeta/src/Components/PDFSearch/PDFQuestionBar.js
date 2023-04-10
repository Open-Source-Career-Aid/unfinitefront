import React, { useState, useEffect } from "react";
import DisplayAnswer from "./DisplayAnswer";
import answerQuestion from "../../Functions/PDFSearch/answerQuestion";

function PDFQuestionBar({ index, docid, QnA, setQnA, question }) {
  const [answer, setAnswer] = useState("");
  const handleQuestionClick = (event) => {
    if (QnA.has(question)) {
      return <DisplayAnswer answer={QnA.get(question)} />;
    } else {
      setAnswer(answerQuestion(question, [docid]));
      setQnA((map) => new Map(map.set(question, answer)));
      console.log("Question not in map. API query complete ✅");
    }
  };

  return (
    <div key={index} onClick={handleQuestionClick}>
      <p>{question}</p>
    </div>
  );
}
export default PDFQuestionBar;
