import React, { useState , useEffect } from 'react';
import '../css/LandingPage.css';
import { Link } from "react-router-dom";
import isAuthenticated from '../Functions/isAuthenticated';
import { useNavigate } from "react-router-dom";
import MobileCheck from "../Functions/MobileCheck";
import ReactGA from 'react-ga';
ReactGA.initialize('G-8YXPLS55QD');

function LandingPage() {

    const navigate = useNavigate();
    const [userstatus, setUserstatus] = useState(false);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, []);

    useEffect(() => {

        const status = isAuthenticated();
        setUserstatus(status);

        if (userstatus) {
            navigate('/');
        }
        else {
            navigate('/landing');
        }

    }, []);
    
    return (
        <div className='bodylandingpage'>
            <div className="LandingPage">
                <h1 className="logocenter">UNFINITE</h1>
                <p>Limited Access.</p>
                <Link className='signupbutton' to='/signup'>Sign Up</Link>
                <Link className='loginbutton' to='/login'>Log in</Link>
            </div>
        </div>
    );
}

export default LandingPage;