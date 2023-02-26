import React, { useState , useEffect } from "react";
import "../css/Signup.css";
import isAuthenticated from '../Functions/isAuthenticated';
import getCSRF from "../Functions/getCSRF";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import getCookie from "../Functions/getCookie";
import { Link } from "react-router-dom";

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

        const status = await isAuthenticated();
        setUserstatus(status);
    
        if (userstatus) {
          navigate('/search');
        } else {
          getCSRF();
        }
      }
    
      checkAuth();
    }, [userstatus]);       

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
        {/* <Navbar /> */}
        <div className="Signup">
            <form>
                <h1>Sign Up</h1>
                {/* <label htmlFor="firstName">Full Name</label> */}
                <div className='fullname'>
                  <input type="text" name="firstName" placeholder="First Name" value={formdata.firstName} onChange={handleChange} required />
                  <input type="text" name="lastName" placeholder="Last Name" value={formdata.lastName} onChange={handleChange} required />
                </div>
                {/* <label htmlFor="email">Email</label> */}
                <input type="email" name="email" placeholder="Email ID" value={formdata.email} onChange={handleChange} required />
                {/* <label htmlFor="password">Password</label> */}
                <input type="password" name="password" placeholder="Password" value={formdata.password} onChange={handleChange} required />
                {/* <label htmlFor="passwordConfirmation">Password Confirmation</label> */}
                <input type="password" name="passwordConfirmation" placeholder="Confirm Password" value={formdata.passwordConfirmation} onChange={handleChange} required />
                {/* <label htmlFor="betaKey">Beta Key</label> */}
                <input type="text" name="betaKey" placeholder="Private Beta Key" value={formdata.betaKey} onChange={handleChange} required />
                <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
            </form>
            <p className='logintext'>Already have an account? <Link to='/login'>Login</Link> or <Link to='/'>Home</Link></p>
        </div>
        </>
    );
}

export default Signup;