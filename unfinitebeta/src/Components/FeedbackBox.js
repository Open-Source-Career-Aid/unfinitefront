import React from "react";
import { useState , useEffect } from "react";
import "../css/FeedbackBox.css";
import sendFeedback from "../Functions/sendFeedback";

const FeedbackBox = ( { query , queryid } ) => {

    const [formdata, setFormdata] = useState({
        feedback: "",
        queryfeedback: false,
    });

    const handleChange = (event) => {
        setFormdata({
            ...formdata,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const feedback = formdata.feedback;
        const queryfeedback = formdata.queryfeedback;
      
        if (feedback.trim() === "") {
          alert("Please fill feedback box");
          return;
        }
      
        let response;
        if (queryfeedback) {
          response = await sendFeedback(queryid, feedback);
        } else {
          response = await sendFeedback(null, feedback);
        }

        // console.log(response);
        // console.log(response===200);
      

        // couldn't get response.status===200 to work
        if (response.detail === 'Feedback submitted') {
          alert("Feedback submitted");
          setFormdata({
            feedback: "",
            queryfeedback: false,
          });
        }
      };
      
      

    return (

    <>
        <form onSubmit={handleSubmit} method="POST">
            <label for="feedback-input">Feedback/Suggestions/Requests:</label>
            <textarea type='text' name="feedback" value={formdata.feedback} onChange={handleChange} required></textarea>
            <div className="feedback-box-last-row">
                <div class="checkbox-container">
                <input type="checkbox" id="queryfeedback" name="queryfeedback" value={true} onChange={handleChange} />
                <label for="queryfeedback"> feedback related to "{ query }"?</label>
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </>

    );
}

export default FeedbackBox;