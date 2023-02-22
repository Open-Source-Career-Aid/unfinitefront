import React, { useState } from 'react';
import './LandingPage.css';
import { Link } from "react-router-dom";

// create a function that accepts first name, last name, email, password, password confirmation, and a beta key

function LandingPage() {


    const [userstatus, setUserstatus] = useState(null);

    const handleClick = (event) => {
        event.preventDefault();
        setUserstatus(event.target.value);
        console.log(userstatus);
    }
    return (
        <div className="LandingPage">
            <h1>Unfinite <span class="beta-symbol">&beta;</span></h1>
            <p>The new way to learn something.</p>
            <button onClick={handleClick} value='hasBeta'><Link to='/signup'>Sign Up</Link></button>
            <button onClick={handleClick} value='isUser'><Link to='/login'>Log in</Link></button>
        </div>
    );
}

export default LandingPage;