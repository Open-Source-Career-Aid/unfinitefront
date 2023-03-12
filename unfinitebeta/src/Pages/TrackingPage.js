import React from "react";
import Navbar from "../Components/Navbar";
import "../css/TrackingPage.css";
import CompletionCard from "../Components/TrackingPage/CompletionCard";

function TrackingPage() {
  return (
    <div className='bodytrackingpage'>
        <Navbar page={'navbardark'}/>
        <div className="trackingpage">
            {/* <h1>Tracking Page</h1> */}

            <div className='onefourth'>
                <div className="trackingpagenav">
                    <h1>ACCOUNT INFORMATION</h1>
                    <h2 className="trackingnavbutton"><div className="learninghistoryicon"></div>Learning History</h2>
                </div>
            </div>

            <div className='threefourth'>
            <h1 >LEARNING HISTORY</h1>
              <CompletionCard  topic='sometuing' completion={[1, 1, 1, 0]}/>
              <CompletionCard  topic='sometuing' completion={[1, 1, 1, 0, 0]}/>
              <CompletionCard  topic='sometuing' completion={[1, 1, 1, 0, 0, 0, 1]}/>
              <CompletionCard  topic='sometuing' completion={[1, 1, 1, 0, 0, 0, 0, 0, 0, 1]}/>
              <CompletionCard  topic='sometuing' completion={[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]}/>
            </div>
        </div>
    </div>
  );
}

export default TrackingPage;