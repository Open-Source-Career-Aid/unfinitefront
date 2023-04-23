import React, { useState, useEffect } from "react";
import PDFQuestionBar from "./PDFQuestionBar";
import PDFQuestionInput from "./PDFQuestionInput";

// Questions and input box container on the left
function PDFQuestionsContainer({ QnA , setQnA , docid , setAnswer , answer , threadid , qids , setQids , selectedqid , setSelectedqid , nextquestion , setNextquestion , setCurrentquestion }) {
  return (
    <div className="qcontainer">
      {/* a search bar that takes in a url and a button */}
      <PDFQuestionInput 
      docid={docid} 
      QnA={QnA} 
      setQnA={setQnA} 
      setAnswer={setAnswer} 
      threadid={threadid} 
      qids={qids} 
      setQids={setQids}
      selectedqid={selectedqid}
      setSelectedqid={setSelectedqid}
      nextquestion={nextquestion}
      setNextquestion={setNextquestion}
      setCurrentquestion={setCurrentquestion}
       />
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
          qids={qids}
          setQids={setQids}
          selectedqid={selectedqid}
          setSelectedqid={setSelectedqid}
          nextquestion={nextquestion}
          setCurrentquestion={setCurrentquestion}
        />
      ))}      
    </div>
  );
}

export default PDFQuestionsContainer;
