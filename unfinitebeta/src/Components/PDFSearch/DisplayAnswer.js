import React, { useState, useEffect } from "react";

function DisplayAnswer({ answer }) {
  return (
    <div>
      <div className="displayanswer">
        <p className="answer">{answer}</p>
      </div>
      <LikeDislike></LikeDislike>
    </div>
  );
}

export default DisplayAnswer;
