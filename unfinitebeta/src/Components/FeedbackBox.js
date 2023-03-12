import React from "react";
import { useState , useEffect } from "react";
import "../css/FeedbackBox.css";
import sendFeedback from "../Functions/sendFeedback";

const FeedbackBox = ( { query , queryid , initialfeedbackstate} ) => {

    const [isOpen, setIsOpen] = useState(initialfeedbackstate);

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

    const handleClose = () => {
        setIsOpen(false);
    }
      
    const handleOpen = () => {
        setIsOpen(true);
    }

    return (

    <>
        <form onSubmit={handleSubmit} method="POST">
          {isOpen ?
          <>
          <div className='feedback-container'>
          <div className="cross" onClick={handleClose}>x</div>
          <div className="feedback-label">
            <label for="feedback-input">Help us improve!</label>
          </div>
          <p>Please leave any feedback or suggestions.</p>
          <textarea type='text' name="feedback" value={formdata.feedback} onChange={handleChange} required></textarea>
          <div className="feedback-box-last-row">
              <div class="checkbox-container">
                <input type="checkbox" id="queryfeedback" name="queryfeedback" value={true} onChange={handleChange} />
                <label for="queryfeedback"> feedback related to "{ query }"?</label>
              </div>
              <button type="submit">Submit</button>
          </div> 
          </div>
          </> : 
          <>
          <div className="feedback-button-container" onClick={handleOpen}>
          </div>
          </>}
        </form>
    </>

    );
}

export default FeedbackBox;