import React, { useState , useEffect } from 'react';
import '../css/LandingPage.css';
import { Link } from "react-router-dom";
import isAuthenticated from '../Functions/isAuthenticated';
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();
    const [userstatus, setUserstatus] = useState(false);

    useEffect(() => {

        const status = isAuthenticated();
        setUserstatus(status);

        if (userstatus) {
            navigate('/search');
        }
        else {
            navigate('/');
        }

    }, []);
    
    return (
        <div className="LandingPage">
            <h1>UNFINITE <span className="beta-symbol">&beta;</span></h1>
            <p>The new way to learn something.</p>
            <button value='hasBeta'><Link to='/signup'>Sign Up</Link></button>
            <button value='isUser'><Link to='/login'>Log in</Link></button>
        </div>
    );
}

export default LandingPage;