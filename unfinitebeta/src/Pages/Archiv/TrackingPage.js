import React from "react";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../css/TrackingPage.css";
import CompletionCard from "../Components/TrackingPage/CompletionCard";
import ReactGA from 'react-ga';
ReactGA.initialize('G-8YXPLS55QD');

function TrackingPage() {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

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
              <CompletionCard />
            </div>
        </div>
    </div>
  );
}

export default TrackingPage;