import React, { useState } from 'react';
import '../css/Roadmap.css';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import getCookie from '../Functions/getCookie';
import getCSRF from '../Functions/getCSRF';

const API_URL = "http://127.0.0.1:8000";

function GetRoadmap({ query }) {
    console.log("getroadmap works")

    // const data = postQuery(query)
    // console.log(data)
    return (
        <div className="roadmap">
            <h1>{query}</h1>
        </div>
    )
}

function Roadmap() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    // const response = fetch(API_URL + props.query)
    // const data = response.json()
    const data = [1, 2, 3, 4, 5]
    
    console.log("roadmap works")
    {// returns data in a list of items}

    return (
        <>
            <Navbar />
            <div className='container'>
                <GetRoadmap query={query}/>
            </div>
        </>

    )
}}

export default Roadmap;