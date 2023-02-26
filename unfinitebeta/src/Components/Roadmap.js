import React, { useState , useEffect } from 'react';
import '../css/Roadmap.css';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import getCookie from '../Functions/getCookie';
import getCSRF from '../Functions/getCSRF';
import getRoadmap from '../Functions/getRoadmap';
import logout from '../Functions/userLogout';
import { useNavigate } from "react-router-dom";
import isAuthenticated from '../Functions/isAuthenticated';

const API_URL = "http://127.0.0.1:8000";

function Roadmap() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const [userstatus, setUserstatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

      const checkAuth = async () => {
        const authenticated = await isAuthenticated();
        setUserstatus(authenticated);
        if (!authenticated) {
          navigate('/login');
        }
      };
    }, [userstatus]);

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
            <div className='resultspage'>

                {/* <getRoadmap query={query}/> */}

                <div className='onethird'>
                  <h1>Roadmap</h1>
                </div>

                <div className='onethird'>
                  <h1>Questions</h1>
                </div>

                <div className='onethird'>
                  <h1>Search Results</h1>
                </div>

            </div>
        </>

    )
}}

export default Roadmap;