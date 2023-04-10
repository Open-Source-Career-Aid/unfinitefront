import React, { useState, useEffect } from "react";

function PDFQuestionInput({ QnA, setQnA }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // make API call with the question for the url
    // setAnswer(<returned string text>)
    setAnswer(""); // CHANGE
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
    </div>
  );
}

export default PDFQuestionInput;
