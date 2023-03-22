import React from "react";
import { useState , useEffect } from "react";
import getQuestions from "../Functions/getQuestions";
import getSummary from "../Functions/getSummary";
import QuestionBar from "../Components/QuestionBar";
import "../css/QuestionBar.css";
import Loading from "../Components/Loading";

const QuestionsContainer = ({ queryid , topicid }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const getQuestionsData = async () => {
            setIsLoading(true);
            const data = await getQuestions(queryid, topicid);
            console.log(data);
            setQuestions(data);
            setIsLoading(false);
        };

        console.log("getting questions for: , queryid: " + queryid + ", topicid: " + topicid)

        getQuestionsData();

    }, [topicid]);

    return ( isLoading ? <Loading /> :
        <div className="questions-container">
            {questions.map((question, index) => (
                <QuestionBar key={index} question={question} queryid={queryid} topicid={topicid} questionid={index} />
            ))}
        </div>
    );
}

export default QuestionsContainer;