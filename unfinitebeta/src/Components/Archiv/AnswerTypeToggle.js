import React from "react";
import '../css/AnswerTypeToggle.css';

const AnswerTypeToggle = ({ setAnswertype , questionid }) => {

    const handleAnswertype = (e) => {

        setAnswertype(e.target.value);

    }

    return (

        <div className='answertypes'>
            <div className='options'>
                {/* <div className='answertypetext'>
                    <p>Answer type: </p>
                </div> */}
                <div>
                    <input type='radio' id='quick' name={`answertype${questionid}`} value={1} onClick={handleAnswertype} className='button-answertype' defaultChecked/>
                    <label className="optionnames" for='quick'>Quick</label>
                </div>
                <div>
                    <input type='radio' id='detailed' name={`answertype${questionid}`} value={2} onClick={handleAnswertype} className='button-answertype'/>
                    <label className="optionnames" for='detailed'>Detailed</label>
                </div>
                <div>
                    <input type='radio' id='simplified' name={`answertype${questionid}`} value={3} onClick={handleAnswertype} className='button-answertype'/>
                    <label className="optionnames" for='simplified'>Simplified</label>
                </div>
            </div>
        </div>

    )
}

export default AnswerTypeToggle;