import React from "react";
import { useEffect, useState } from "react";
import "./CompletionCard.css";
import Progress from "./Progress";
import { useNavigate } from "react-router-dom";
import getTrackingCompletions from "../../Functions/getTrackingCompletions";

function CompletionCard() {

    const navigate = useNavigate();
    const [completions, setCompletions] = useState([]);

    useEffect(() => {

        const getCompletions = async () => {

            const completionslist = [];
            const completions = await getTrackingCompletions();
            console.log(completions[0].id, completions[0].title, JSON.parse(completions[0].completion));
            for (let i = 0; i < completions.length; i++) {
                completionslist.push([completions[i].id, completions[i].title, JSON.parse(completions[i].completion)]);
            }
            setCompletions(completionslist);
        }

        getCompletions();
    }, []);

    // const topic = props.topic;
    // const completion = props.completion;
    // const navigate = useNavigate();

    const handleClick = (event) => {
        const topic = event.target.innerText;
        navigate(`/results?query=${topic}`);
    }

    return (
        <div className="completioncard">
            <h1 className="heading"><div className="inprogressicon"></div>In Progress</h1>
            <div className="completioncardbody">

                {completions.map((completion) => (
                    <div className="completioncardbodyitem">
                    <div className="completioncardbodyleft" onClick={handleClick}>

                        <div className="completioncardbodyleftitem" onClick={handleClick}>
                            {completion[1]}
                        </div>
                    </div>
                    <div className="completioncardbodyright">
                        <Progress list={JSON.parse(completion[2])} />
                    </div>
                    </div>
                ))}

                {/* <div className="completioncardbodyright">
                    {completions.map((completion) => (<Progress list={JSON.parse(completion[2])} />))}
                </div> */}

            </div>
        </div>
    );
}

export default CompletionCard;