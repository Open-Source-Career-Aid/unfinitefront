import React, { useState , useEffect } from "react";
import "../css/Signup.css";
import isAuthenticated from '../Functions/isAuthenticated';
import getCSRF from "../Functions/getCSRF";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import getCookie from "../Functions/getCookie";

const API_HOST = 'http://localhost:8000';

function postRegister(email, password, cfmPassword, firstName, lastName, betaKey) {

    const csrfToken = getCookie('csrftoken');
  
    fetch(`${API_HOST}/api/register/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
        cfm_Password: cfmPassword,
        first_name: firstName,
        last_name: lastName,
        beta_key: betaKey,
      })
    })
    .then(response => { return response.json()})
    .then(data => {
      return data.result;
    });
  }

function Signup() {

    const navigate = useNavigate();
    const [userstatus, setUserstatus] = useState(false);

    useEffect(() => {
      async function checkAuth() {
        // const status = await isAuthenticated();
        // setUserstatus(status);
    
        if (userstatus) {
          navigate('/search');
        } else {
          getCSRF();
        }
      }
    
      checkAuth();
    }, []);       

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

    const handleSubmit = async (event) => {
        // event.preventDefault();
        // console.log(formdata);
      
        if (formdata.password.toString() !== formdata.passwordConfirmation.toString()) {
          alert("Passwords do not match");
        } else if (
          formdata.email.toString() === '' ||
          formdata.password.toString() === '' ||
          formdata.passwordConfirmation.toString() === '' ||
          formdata.firstName.toString() === '' ||
          formdata.lastName.toString() === '' ||
          formdata.betaKey.toString() === ''
        ) {
          alert("Please fill out all fields");
        } else {
          const response = await postRegister(
            formdata.email,
            formdata.password,
            formdata.passwordConfirmation,
            formdata.firstName,
            formdata.lastName,
            formdata.betaKey
          );
          
          // console.log(response.status)
          if (response.status === 200) {
            const status = await isAuthenticated();
            setUserstatus(status);
    
            if (userstatus) {
              console.log('User is logged in');
              navigate('/search');
            }
          } else {
            alert('Sign up failed. Please try again.');
          }
        }
      };
      

    return (
        <>
        <Navbar />
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
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
        </>
    );
}

export default Signup;