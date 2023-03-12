import React from "react";
import "./CompletionCard.css";
import Progress from "./Progress";
import { useNavigate } from "react-router-dom";

function CompletionCard(props) {

    const topic = props.topic;
    const completion = props.completion;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/results?query=${topic}`);
    }

    return (
        <div className="completioncard">
            <h1 className="heading"><div className="inprogressicon"></div>In Progress</h1>
            <div className="completioncardbody">
                <div className="completioncardbodyleft" onClick={handleClick}>
                    {topic}
                </div>
                <div className="completioncardbodyright">
                    <Progress list={completion} />
                </div>
            </div>
        </div>
    );
    }

export default CompletionCard;