import React from "react";
import { useState , useEffect } from "react";
import "../css/FeedbackBox.css";
import sendFeedback from "../Functions/sendFeedback";

const FeedbackBox = ( { query , queryid } ) => {

    const [feedback, setFeedback] = useState("");
    const [queryfeedback, setQueryfeedback] = useState(false);
    const [feedbacksent, setFeedbacksent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(e.target.feedback.value);
        setQueryfeedback(e.target.queryfeedback.checked);
      
        if (queryfeedback) {
          const response = await sendFeedback({ queryid, feedback });
          if (response.status === 200) {
            setFeedbacksent(true);
            }
        } else {
            const response = await sendFeedback({ queryid: null, feedback });
            if (response.status === 200) {
                setFeedbacksent(true);
                }
        }
      };
      

    return (

    <>
        <form onSubmit={handleSubmit} method="POST">
            <label for="feedback-input">Feedback/Suggestions/Requests:</label>
            <textarea id="feedback-input" name="feedback"></textarea>
            <div className="feedback-box-last-row">
                <div class="checkbox-container">
                <input type="checkbox" id="queryfeedback" value={ queryid } />
                <label for="queryfeedback"> feedback related to "{ query }"?</label>
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </>

    );
}

export default FeedbackBox;