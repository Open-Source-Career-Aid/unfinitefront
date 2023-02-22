import React, { useState } from "react";
import "./Signup.css";

// a form that takes in first name, last name, email, password, password confirmation, and a beta key, stores it in a constant, and then sends it to the backend

const API_HOST = 'http://localhost:8000';

let _csrfToken = null;

async function getCsrfToken() {
    if (_csrfToken === null) {
      const response = await fetch(`${API_HOST}/api/csrf_cookie`, {
        credentials: 'include',
      });
      const data = await response.json();
      _csrfToken = data.csrfToken;
    }
    return _csrfToken;}

async function postRegister(email, password, cfmPassword, firstName, lastName, betaKey) {
    const csrfToken = await getCsrfToken();
    const response = await fetch(`${API_HOST}/api/register/`, {
        method: 'POST',
        headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
        email: email,
        password: password,
        cfm_password: cfmPassword,
        first_name: firstName,
        last_name: lastName,
        beta_key: betaKey
        })
    });
    const data = await response.json();
    return data.result;
    }


function Signup() {

    const [formdata, setFormdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        betaKey: ""
    });

    const handleChange = (event) => {
        setFormdata({
            ...formdata,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formdata);

        postRegister(formdata.email, formdata.password, formdata.passwordConfirmation, formdata.firstName, formdata.lastName, formdata.betaKey);
    };

    return (
        <div className="Signup">
            <form>
                <h1>Sign Up</h1>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" value={formdata.firstName} onChange={handleChange} required />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" value={formdata.lastName} onChange={handleChange} required />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formdata.email} onChange={handleChange} required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formdata.password} onChange={handleChange} required />
                <label htmlFor="passwordConfirmation">Password Confirmation</label>
                <input type="password" name="passwordConfirmation" value={formdata.passwordConfirmation} onChange={handleChange} required />
                <label htmlFor="betaKey">Beta Key</label>
                <input type="text" name="betaKey" value={formdata.betaKey} onChange={handleChange} required />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Signup;