import React, { useState , useEffect } from "react";
import "../css/Signup.css";
import isAuthenticated from '../Functions/isAuthenticated';
// import saveSessionId from "./saveSessionid";
import getCSRF from "../Functions/getCSRF";
import { useNavigate } from "react-router-dom";
// import getCookie from "./getCookie";
import Navbar from "../Components/Navbar";

// a form that takes in first name, last name, email, password, password confirmation, and a beta key, stores it in a constant, and then sends it to the backend

const API_HOST = 'http://localhost:8000';

    // useevent that runs the getcsrf token function when the page loads


// const getCookie = (name) => {
//     const value = "; " + document.cookie;
//     const parts = value.split("; " + name + "=");
//     if (parts.length === 2) {
//         return parts.pop().split(";").shift();
//     }
//     };

function postRegister(email, password, cfmPassword, firstName, lastName, betaKey) {

    const csrfToken = localStorage.getItem('csrfToken');
  
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
    //   console.log(data.result);/
      return data.result;
    });
  }
  

// async function postRegister(email, password, cfmPassword, firstName, lastName, betaKey) {

//     const csrfToken = localStorage.getItem('csrfToken');

//     const response = await fetch(`${API_HOST}/api/register/`, {
//         method: 'POST',
//         headers: {
//         'X-CSRFToken': csrfToken,
//         'Content-Type': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify({
        
//         email: email,
//         password: password,
//         cfm_Password: cfmPassword,
//         first_name: firstName,
//         last_name: lastName,
//         beta_key: betaKey,

//         })
//     });
//     const data = await response.json();
//     console.log(data.result);
//     return data.result;
//     }


function Signup() {

    const navigate = useNavigate();
    const [userstatus, setUserstatus] = useState(null);

    // const [response, setResponse] = useState(null);

    useEffect(() => {

        getCSRF();

        const status = isAuthenticated();
        setUserstatus(status);

        if (userstatus) {
            navigate('/search');
        }

        // async function getCsrfToken() {
        //     if (_csrfToken === null) {
        //       const response = await fetch(`http://localhost:8000/api/csrf_cookie`, {
        //         credentials: 'include',
        //       });
        //       const data = await response.json();
        //       _csrfToken = data.csrfToken;
        //     }
        //     return _csrfToken;
        //   }

        // getCsrfToken().then((csrfToken) => {
        //     console.log(csrfToken);
        //     localStorage.setItem('csrfToken', csrfToken);
        //     document.cookie = `csrftoken=${csrfToken}`;
        // }, []);

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
        event.preventDefault();
        console.log(formdata);
      
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
          
          console.log(response.status)
          if (response === 200) {
            navigate('/login');
          } else {
            // handle error
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