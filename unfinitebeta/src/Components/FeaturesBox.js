import React from "react";
import "../css/FeaturesBox.css";

const FeaturesBox = () => {

    return (
        <div className="feature-updates">
            <div className="feature-box">
                <h3>New Features</h3>
                <p className="feature-date">Updated: 17th March, 2023</p>
                <p className="feature-name">Track your learning history</p>
                <p className="feature-description">Save your roadmaps, return to them later, and track your online-learning.</p>
                <p className="feature-name">Customise your learning pathway</p>
                <p className="feature-description">PERSONALISATION LEVEL 1 - On-demand course generation.</p>
                <p className="feature-name">Relevant resources</p>
                <p className="feature-description">No-more time wasted in meta-learning. Start-learning with search results optimized for online-education.</p>
            </div>
            <div className="feature-box">
                <h3>Upcoming Features</h3>
                <p className="feature-date">Updated: 17th March, 2023</p>
                <p className="feature-name">Roadmap Customisation</p>
                <p className="feature-description">Interact with your roadmaps, and learn only what you want to.</p>
                <p className="feature-name">AI summaries with citations</p>
                <p className="feature-description">Know what to expect before you click on a search result.</p>
                <p className="feature-name">Resource Filtering</p>
                <p className="feature-description">Choose your own resources, because you are a unique learner.</p>
            </div>
        </div>
    )

}

export default FeaturesBox;