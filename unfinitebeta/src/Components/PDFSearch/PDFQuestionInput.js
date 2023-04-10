import React, { useState, useEffect } from "react";
import answerQuestion from "../../Functions/PDFSearch/answerQuestion";
import DisplayAnswer from "./DisplayAnswer";

function PDFQuestionInput({ QnA, setQnA, docid }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // make API call with the question for the url
    // setAnswer(<returned string text>)
    setAnswer(answerQuestion(question, [docid]));
    setQnA((map) => new Map(map.set(question, answer)));
    console.log("query complete ✅");
  };

  useEffect(() => {
    setQuestion("");
  }, [QnA]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask something."
          value={question}
          onChange={handleInputChange}
        />
      </form>
      <DisplayAnswer answer={answer} />
    </div>
  );
}

export default PDFQuestionInput;
