import React, { useState, useEffect } from "react";
import PDFQuestionBar from "./PDFQuestionBar";
import PDFQuestionInput from "./PDFQuestionInput";

// Questions and input box container on the left
function PDFQuestionsContainer({ QnA , setQnA , docid , setAnswer , answer , threadid , qids , setQids , selectedqid , setSelectedqid , nextquestion , setNextquestion , setCurrentquestion , answerisgenerating , setAnswerisgenerating , urls , setUrls , relevantqs , setRelevantqs }) {
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
      answerisgenerating={answerisgenerating}
      setAnswerisgenerating={setAnswerisgenerating}
      urls={urls}
      setUrls={setUrls}
      relevantqs={relevantqs}
      setRelevantqs={setRelevantqs}
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
          setAnswerisgenerating={setAnswerisgenerating}
          urls={urls}
          setUrls={setUrls}
          relevantqs={relevantqs}
          setRelevantqs={setRelevantqs}
        />
      ))}      
    </div>
  );
}

export default PDFQuestionsContainer;
