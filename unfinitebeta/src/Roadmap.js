import React, { useState } from 'react';
// import './Roadmap.css';

// const API_URL = "http://127.0.0.1:8000/api/";

// function that takes in a query, and the X with it in the list of questions
function searchPrompt({query}) {
    const questions = ['What is'+{query}+'?']
    return (
        <div class="container">
            <div class="search-prompt">
                <h3>Search Prompt</h3>
                <ul>
                    {questions.map((item) => (
                    <li key={item}><a href='#'>{item}</a></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function Roadmap() {

    // const response = fetch(API_URL + props.query)
    // const data = response.json()

    const [selectedItem, setSelectedItem] = useState(null);
    const data = [1, 2, 3, 4, 5]
    
    console.log("roadmap works")
    {// returns data in a list of items}

    const handleClick = (item) => {
        setSelectedItem(item);
    }

    return (
        <div class="container">
            <div class="roadmap">
                <h3>Roadmap</h3>
                <ul>
                    {data.map((item) => (
                    <li key={item}><a href='#' onClick={handleClick}>{item}</a></li>
                    ))}
                </ul>
            </div>
            {selectedItem ? <searchPrompt query={selectedItem} /> : null}
        </div>

    )
}}

export default Roadmap;