import react , { useState } from 'react';
// import complexitybar.css
import '../../css/complexitybar.css';

function AnswerComplexity( { setSpecialresponse } ) {

    // this function takes in a setComplexity function and sets it to a complexity value based on a radio button selection
    const handleComplexity = (event) => {

        // set the value to the text inside the button
        // console.log(event.target.innerText);
        setSpecialresponse(event.target.innerText)
    }

    return (
        <div className='filters'>
            {/* <p className='filter-title'>Modify the response</p> */}
            <div className="complexity">
                <div className="complexity-buttons">
                    <div className="complexity-button" onClick={handleComplexity} value={1} >
                        <p>Analogify</p>
                    </div>
                    <div className="complexity-button" onClick={handleComplexity} value={2} >
                        <p>Simplify</p>
                    </div>
                    <div className="complexity-button" onClick={handleComplexity} value={3} >
                        <p>Comprehensify</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnswerComplexity;