import React, { useState , useEffect } from "react";
import "../css/Authentication.css";
import isAuthenticated from '../Functions/isAuthenticated';
import getCSRF from "../Functions/getCSRF";
import { useNavigate } from "react-router-dom";
import getCookie from "../Functions/getCookie";
import { Link } from "react-router-dom";
import { API_URL } from "../API_URL";
import ReactGA from 'react-ga';
ReactGA.initialize('G-8YXPLS55QD');

async function postRegister(email, password, cfmPassword, firstName, lastName) {
	
	await getCSRF();
    const csrfToken = getCookie('csrftoken');
  
    return fetch(`${API_URL}register/`, {
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
        last_name: lastName
      })
    });
    //.then(response => { return response.json()})
    //.then(data => {
    //  return data.result;
    //});
  }

function Signup() {

    const navigate = useNavigate();
    const [userstatus, setUserstatus] = useState(false);

    useEffect(() => {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    useEffect(() => {
      async function checkAuth() {

        const status = await isAuthenticated();
        setUserstatus(status);
    
        if (userstatus) {
          navigate('/');
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
		event.preventDefault();
        if (formdata.password.toString() !== formdata.passwordConfirmation.toString()) {
          alert("Passwords do not match");
        } else if (
          formdata.email.toString() === '' ||
          formdata.password.toString() === '' ||
          formdata.passwordConfirmation.toString() === '' ||
          formdata.firstName.toString() === '' ||
          formdata.lastName.toString() === ''
        ) {
          alert("Please fill out all fields");
        } else {
          const response = await postRegister(
            formdata.email,
            formdata.password,
            formdata.passwordConfirmation,
            formdata.firstName,
            formdata.lastName
          );
          
          // console.log(response.status)
          if (response.status === 200) {
            const status = await isAuthenticated();
            setUserstatus(status);
    
            if (status) {
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
        <div className='bodyauthentication'>
        <div className="authentication">
            <form>
                <h1 className='h1auth'>Sign Up</h1>
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
                {/* <input type="text" name="betaKey" placeholder="Private Beta Key" value={formdata.betaKey} onChange={handleChange} required /> */}
                <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
            </form>
            <p className='authtext'>Already have an account? <Link className="aauth" to='/login'>Login</Link> or <Link className="aauth" to='/Landing'>Home</Link></p>
        </div>
        </div>
        </>
    );
}

export default Signup;