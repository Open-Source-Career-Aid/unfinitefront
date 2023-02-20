import React from 'react';


// const API_URL = "http://127.0.0.1:8000/api/";

function Roadmap({query}) {

    // const response = fetch(API_URL + props.query)
    // const data = response.json()
    
    console.log("roadmap works")

    return (
        <div>
            <h1>You want to learn abour "{query}"</h1>
        </div>
    )
}

export default Roadmap;