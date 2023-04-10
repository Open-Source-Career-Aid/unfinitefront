import React, { useState, useEffect } from "react";
import answerQuestion from "../../Functions/PDFSearch/answerQuestion";
import DisplayAnswer from "./DisplayAnswer";

function PDFQuestionInput({ QnA, setQnA, docid , setAnswer , answer }) {

  const [question, setQuestion] = useState("");
  const [handlingSubmit, setHandlingSubmit] = useState(false);

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // make API call with the question for the url
    async function getAnswer() {
      if (!handlingSubmit) {
        setHandlingSubmit(true);
        setAnswer("Loading...");
        const response = await answerQuestion(question, [docid]);
        setAnswer(response);
        setQnA((map) => new Map(map.set(question, response)));
        console.log("query complete ✅");
        setHandlingSubmit(false);
      }
    }
    getAnswer();
  };

  // async handleSubmit = (event) => {
  //   event.preventDefault();
  //   // make API call with the question for the url
  //   // setAnswer(<returned string text>)
  //   const answer = answerQuestion(question, [docid]);
  //   setAnswer(answerQuestion(question, [docid]));
  //   setQnA((map) => new Map(map.set(question, answer)));
  //   console.log("query complete ✅");
  // };

  useEffect(() => {
    setQuestion("");
  }, [QnA]);

  return (
    <div className="ask">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask something."
          value={question}
          onChange={handleInputChange}
        />
        <button type="submit">Ask</button>
      </form>
    </div>
  );
}

export default PDFQuestionInput;
