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
            <h1 className="logocenter">UNFINITE <span className="beta-symbol">&beta;</span></h1>
            <p>The new way to learn something.</p>
            <Link className='signupbutton' to='/signup'>Sign Up</Link>
            <Link className='loginbutton' to='/login'>Log in</Link>
        </div>
    );
}

export default LandingPage;