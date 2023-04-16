import React, { useState , useEffect } from 'react';
import Roadmap from '../Components/Roadmap';
import '../css/ResultsPage.css';
import isAuthenticated from '../../Functions/isAuthenticated';
import { useNavigate } from "react-router-dom";
import ReactGA from 'react-ga';
ReactGA.initialize('G-8YXPLS55QD');

/* function that takes in a list of items and lists them on the left as a clickable list */

function ResultsPage({items}) {

    const [userstatus , setUserstatus] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    useEffect(() => {

        const checkAuth = async () => {
          const authenticated = await isAuthenticated();
          setUserstatus(authenticated);
          if (!authenticated) {
            navigate('/login');
          }
        };
    
        checkAuth();
    
      }, []);  

    return (

      <div className='bodyresultspage'>
        <div className='ResultsPage'>
            <Roadmap />
        </div>
      </div>
    )
}

export default ResultsPage;