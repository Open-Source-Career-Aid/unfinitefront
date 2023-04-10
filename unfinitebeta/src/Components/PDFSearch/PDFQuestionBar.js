import React, { useState, useEffect } from "react";

function PDFQuestionBar({ index, question }) {
  return (
    <div key={index}>
      <p>{question}</p>
    </div>
  );
}
export default PDFQuestionBar;
