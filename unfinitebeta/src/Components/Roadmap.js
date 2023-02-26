import React, { useState } from 'react';
import '../css/Roadmap.css';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import getCookie from '../Functions/getCookie';
import getCSRF from '../Functions/getCSRF';
import getRoadmap from '../Functions/getRoadmap';
import logout from '../Functions/userLogout';
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

function Roadmap() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    const navigate = useNavigate();

    // const response = fetch(API_URL + props.query)
    // const data = response.json()
    const data = getRoadmap(query)
    console.log(data)
    
    // console.log("roadmap works")
    {// returns data in a list of items}

    const handleLogout = (event) => {
      event.preventDefault();
      logout();
      navigate('/login');
    };

    return (
        <>
            <div className="containerusername">
              <h4>Welcome! <span className="username"><button onClick={handleLogout}>Logout</button></span></h4>
            </div>
            {/* <Navbar /> */}
            <div className='container'>
                {/* <getRoadmap query={query}/> */}
                <h1>roadmap | questions | search results</h1>
            </div>
        </>

    )
}}

export default Roadmap;