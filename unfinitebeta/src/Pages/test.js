import React from 'react';
import { useState , useEffect } from 'react';
import getSummaryStream from '../Functions/getSummaryStream';

const Test = () => {

    const [text, setText] = useState("");

    useEffect(() => {

        const getSummaryData = async () => {
            const data = await getSummaryStream(1, 0, 3, 3, setText);
            console.log(data);
        };

        getSummaryData();

    }, []);
    // const questions = ['something', 'something else', 'something else again'];
    
    // const [questions, setQuestions] = useState([]);
    // const [summary, setSummary] = useState([]);

    // useEffect(() => {
    //     console.log("thisone", questions);
    // }, [questions]);

    // useEffect(() => {
    //     console.log("thisone", summary);
    // }, [summary]);

    // useEffect(() => {

    //     const getQuestionsData = async () => {
    //         const data = await getQuestions(1, 1);
    //         setQuestions(data);
    //     };

    //     getQuestionsData();

    // }, []);

    // useEffect(() => {

    //     const getSummaryData = async () => {
    //         const data = await getSummary(1, 1, 1);
    //         setQuestions(data);
    //     };

    //     getSummaryData();

    // }, []);

    // return (
    //     <div>
    //         <h1>Test</h1>
    //         <QuestionsContainer queryid={2} topicid={6}/>
    //     </div>
    // );

    return (
        <div>
            <h1>{text}</h1>
        </div>
    );
}

export default Test;
