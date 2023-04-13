import React, { useState , useEffect } from "react";
import PremiumButton from "./premiumbutton";

function DisplayAnswer({ answer }) {

    return (
        <>
            <div className='displayanswer'>
                <p className="answer">{answer}</p>
                {/* <PremiumButton /> */}
            </div>
        </>
    )
}

export default DisplayAnswer;