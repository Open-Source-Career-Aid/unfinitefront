import react , { useState } from 'react';
// import complexitybar.css
import '../../css/complexitybar.css';

function AnswerComplexity( ) {

    // this function takes in a setComplexity function and sets it to a complexity value based on a radio button selection
    const handleComplexity = (event) => {
        // setComplexity(event.target.value);
    }

    return (
        <div className="complexity">
            {/* <h3>Modify the response</h3> */}
            <div className="complexity-buttons">
                <div className="complexity-button">
                    <p>Dumbsplain</p>
                </div>
                <div className="complexity-button">
                    <p>Simplify</p>
                </div>
                <div className="complexity-button">
                    <p>Talk to me like you would talk to an academic</p>
                </div>
            </div>
        </div>
    );
}

export default AnswerComplexity;