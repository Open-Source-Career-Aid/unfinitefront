import React from "react";
import { useState, useEffect } from "react";
import "../css/QuestionBar.css";
import ReferencePod from "./ReferencePod";
import TypingText from "./TypingText";
import getSummary from "../Functions/getSummary";
import Loading from "./Loading";

const QuestionBar = ({ question, queryid, topicid, questionid }) => {

    const [isopen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState('');
    const [summarycalled, setSummaryCalled] = useState(false);
    const [text, setText] = useState("");
    const [references, setReferences] = useState([]);
    // const [summaryurl , setSummaryUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setText(summary);

    }, [summary]);

    const toggle = () => {

        const getSummaryData = async () => {
            setIsLoading(true);
            const data = await getSummary(queryid, topicid, questionid);
            console.log(data[0], data[1]);
            setSummary(data[0]);
            // console.log(data[1], Array.isArray(data[1]));
            setReferences(data[1]);
            // setSummaryUrl(data[2]);
            setIsLoading(false);
        }
        
        if (!isopen && !summarycalled) {
            getSummaryData();
            setSummaryCalled(true);
        }

        setIsOpen(!isopen);
    };

    return (
        <div className="content-container">
            <div className="question-bar" onClick={toggle}>
                <h2 className="question">{question}</h2>
            </div>
            
            {isopen && 
            <>
            { isLoading ? <Loading /> :
            <>
            <div className="answer-container">
                <p className="answer">
                    <TypingText text={text} typingeffect={setSummaryCalled}/>
                </p>
            </div>
            <div className="reference-container">
                <h1 className="header">References</h1>
                <div className="references">
                    {references.map((reference, index) => (
                        <ReferencePod key={index} link={reference} isSummaryurl={false} index={index}/>
                    ))}
                </div>
            </div>
            </>
}
            </>}
            
        </div>
    );
}

export default QuestionBar;