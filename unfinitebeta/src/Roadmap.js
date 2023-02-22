import React, { useState } from 'react';
import './Roadmap.css';

// const API_URL = "http://127.0.0.1:8000/api/";

function GeneratedRoadmap({data}) {
        return (
        <div>
            <h1 className='logo'>Unfinite <span className="beta-symbol">&beta;</span></h1>
            <div className="roadmap">
                <h2>Roadmap</h2>
                <ul>
                    {data.map((item) => (
                    <a href='#'><li key={item}>{item}</li></a>
                    ))}
                </ul>
            </div>
        </div>

    )
}

function QuestionsList({topic}) {
    return (
        <div className="questions">
            <h2>Questions</h2>
            <ul>
                <li>What is {topic}?</li>
            </ul>
        </div>
    )
}

function Roadmap() {

    // const response = fetch(API_URL + props.query)
    // const data = response.json()
    const data = [1, 2, 3, 4, 5]
    
    console.log("roadmap works")
    {// returns data in a list of items}

    return (
        <div className='container'>
            <GeneratedRoadmap data={data}/>
            <QuestionsList topic="React"/>
        </div>

    )
}}

export default Roadmap;