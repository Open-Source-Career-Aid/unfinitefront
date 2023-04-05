import React from "react";
import "../css/FeaturesBox.css";

const FeaturesBox = () => {

    return (
        <div className="feature-updates">
            <div className="feature-box">

                <h3>New Features</h3>
                <p className="feature-date">Updated: 03rd April, 2023</p>

                <p className="feature-name">Customise your summaries: 29 March</p>
                <p className="feature-description">Toggle between a quick, detailed, or a simplified summary.</p>

                <p className="feature-name">AI Summaries with Citations: 25 March</p>
                <p className="feature-description">Know what to expect before you click on a search result.</p>

                <p className="feature-name">Relevant Questions: 22 March</p>
                <p className="feature-description">Q/A based guided learning for you to learn effectively and in a guided manner.</p>

                {/* <p className="feature-name">Track your learning history: 18 March</p>
                <p className="feature-description">Save your roadmaps, return to them later, and track your online-learning.</p> */}

                {/* <p className="feature-name">Customise your learning pathway: 18 March</p>
                <p className="feature-description">PERSONALISATION LEVEL 1 - On-demand course generation.</p> */}
            </div>
            <div className="feature-box">

                <h3>Upcoming Features</h3>
                <p className="feature-date">Updated: 05rd April, 2023</p>

                {/* <p className="feature-name">AI summaries with citations</p>
                <p className="feature-description">Know what to expect before you click on a search result.</p>

                <p className="feature-name">Detailed Answers</p>
                <p className="feature-description">In-depth answers for effective learning.</p> */}

                <p className="feature-name">Ask follow ups!</p>
                <p className="feature-description">Chat with Unfinite, dive deeper with what you want to learn.</p>
                
                {/* <p className="feature-name"></p>
                <p className="feature-description">Choose your own resources, because you are a unique learner.</p> */}

                <p className="feature-name">Up-to-date topics</p>
                <p className="feature-description">Learn what the industry has to offer, e.g. prompt engineering, python 4.0, etc.</p>

                <p className="feature-name">Resource Filtering</p>
                <p className="feature-description">Choose your own resources, because you are a unique learner.</p>

            </div>
        </div>
    )

}

export default FeaturesBox;