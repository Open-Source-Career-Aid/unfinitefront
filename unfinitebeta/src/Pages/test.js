import React from 'react';
import { useState , useEffect } from 'react';
import getQuestions from '../Functions/getQuestions';
import getSummary from '../Functions/getSummary';

const Test = () => {

    const [questions, setQuestions] = useState([]);
    const [summary, setSummary] = useState([]);

    useEffect(() => {
        console.log("thisone", questions);
    }, [questions]);

    useEffect(() => {
        console.log("thisone", summary);
    }, [summary]);

    useEffect(() => {

        const getQuestionsData = async () => {
            const data = await getQuestions(1, 1);
            setQuestions(data);
        };

        getQuestionsData();

    }, []);

    useEffect(() => {

        const getSummaryData = async () => {
            const data = await getSummary(1, 1, 1);
            setQuestions(data);
        };

        getSummaryData();

    }, []);

    return (
        <div>
            <h1>Test</h1>
        </div>
    );
}

export default Test;
