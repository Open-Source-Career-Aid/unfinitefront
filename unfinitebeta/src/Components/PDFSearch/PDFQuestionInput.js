import React, { useState, useEffect } from "react";
import answerQuestion from "../../Functions/PDFSearch/answerQuestion";
import DisplayAnswer from "./DisplayAnswer";

function PDFQuestionInput({ QnA, setQnA, docid , setAnswer , answer , threadid }) {

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
        const response = await answerQuestion(question, [docid], threadid);
        if (response==="") {
          setAnswer("Seems like the team has more work to do. Please use the feedback box on the bottom left to leave a note, and we will have it fixed in no time.");
        }
        else {
        setAnswer(response);
        }
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
