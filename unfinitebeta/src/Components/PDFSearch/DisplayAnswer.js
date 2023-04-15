import React, { useState , useEffect } from "react";
import PremiumButton from "./premiumbutton";

function DisplayAnswer({ answer }) {

    // a function that takes in the answer and finds any chunk of text enclosed b/w `` and `` and highlishts it
    const highlight = (answer) => {
        let highlighted = answer.split('`').map((item, index) => {
            if (index % 2 === 0) {
                return item;
            }
            return <span className="highlight">{item}</span>
        })
        console.log(highlighted);
        return highlighted;
    }
    
    const [highlighted, setHighlighted] = useState(highlight(answer));

    useEffect(() => {
        setHighlighted(highlight(answer));
    }, [answer])

    return (
        <>
            <div className='displayanswer'>
                {/* <p className="answer">{highlight}</p> */}
                <p className="answer">{highlighted}</p> 
                {/* <PremiumButton /> */}
            </div>
        </>
    )
}

export default DisplayAnswer;