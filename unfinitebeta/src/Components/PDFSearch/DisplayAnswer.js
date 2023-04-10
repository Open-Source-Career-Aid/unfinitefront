import React, { useState , useEffect } from "react";

function DisplayAnswer({ answer }) {

    return (
        <div className='displayanswer'>
            <p className="answer">{answer}</p>
        </div>
    )
}

export default DisplayAnswer;