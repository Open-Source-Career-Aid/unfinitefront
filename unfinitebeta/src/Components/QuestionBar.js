import React from "react";
import { useState, useEffect } from "react";
import "../css/QuestionBar.css";
import ReferencePod from "./ReferencePod";
import TypingText from "./TypingText";
import getSummary from "../Functions/getSummary";
import Loading from "./Loading";
import AnswerTypeToggle from "./AnswerTypeToggle";
import getSummaryStream from "../Functions/getSummaryStream";

const QuestionBar = ({ question, queryid, topicid, questionid , areOpen , setAreOpen }) => {

    // const [isopen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState('');
    // const [summarycalled, setSummaryCalled] = useState(false);
    const [text, setText] = useState("");
    const [references, setReferences] = useState([]);
    // const [summaryurl , setSummaryUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [answertype, setAnswertype] = useState(null);
    // const [typingeffect, setTypingeffect] = useState([true, true, true]);

    useEffect(() => {

        setText(summary);

    }, [summary]);

    useEffect(() => {

        console.log('answertype:', answertype);
        setText('');

        const getSummaryData = async () => {
            setIsLoading(true);
            if (answertype !== null) {
                console.log('Inside the conditional');
                const data = await getSummaryStream(queryid, topicid, questionid, answertype, setText);
                // if (typingeffect[answertype - 1] === true) {
                //     const updatedTypingeffect = [...typingeffect];
                //     updatedTypingeffect[answertype - 1] = false;
                //     setTypingeffect(updatedTypingeffect);
                // }
                // console.log(data[0], data[1]);
                // setSummary(data[0]);
                // console.log(data[1], Array.isArray(data[1]));
                // setReferences(data[1]);
                // setSummaryUrl(data[2]);
                setIsLoading(false);
            }
        }

        console.log('isopen:', areOpen[questionid]);
        if (areOpen[questionid]) {
            console.log('isopen is true');
            getSummaryData();
        }
  
      }, [answertype]);

    const toggle = () => {
        
        if (!areOpen[questionid]) {
            // setSummaryCalled(true);
            if (answertype === null) {
                setAnswertype(1);
        }
        }

        const updatedAreOpen = [...areOpen];
        updatedAreOpen[questionid] = !updatedAreOpen[questionid];
        setAreOpen(updatedAreOpen);
    };

    return (
        <div className="content-container">
            <div className="question-bar" onClick={toggle}>
                <h2 className="question">{question}</h2>
            </div>
            
            {areOpen[questionid] && 
            <>
            <AnswerTypeToggle setAnswertype={setAnswertype} questionid={questionid}/>
            { text=='' ? <>
                <Loading />
            
            </> :
            <>
            <div className="answer-container">
                <p className="answer">
                    {/* <TypingText text={text} typingeffect={typingeffect[answertype-1]}/> */}
                    {text}
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