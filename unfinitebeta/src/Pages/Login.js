import React, { useState , useEffect} from "react";
import "../css/Login.css";
import isAuthenticated from '../Functions/isAuthenticated';
// import saveSessionId from "./saveSessionid";
// import getCSRF from "./getCSRF";
import { useNavigate } from "react-router-dom";
import getCookie from "../Functions/getCookie";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import getCSRF from "../Functions/getCSRF";

// a form that takes in email and password, stores it in a constant, and then sends it to the backend
const API_HOST = 'http://localhost:8000';

function postLogin(email, password) {

    getCSRF();
    const csrfToken = getCookie('csrftoken');

    return fetch(`${API_HOST}/api/login/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        return data.result;
    });
}



function Login() {

    const navigate = useNavigate();
    const [userstatus, setUserstatus] = useState(false);

    useEffect(() => {
        console.log("Login page loaded");
    
        const checkUserStatus = async () => {
            const status = await isAuthenticated();
            setUserstatus(status);
    
            if (!status) {
                console.log("User is not logged in");
                navigate('/login');
            } else {
                console.log("User is already logged in");
                navigate('/search');
            }
        }
    
        checkUserStatus();
    }, []);
    

    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        setFormdata({
            ...formdata,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        // event.preventDefault();
        // console.log("Login form submitted");
      
        if (formdata.email.toString() === "" || formdata.password.toString() === "") {
          alert("Please fill out all fields");
        } 
        else {
          
          setUserstatus(true);
          const response = await postLogin(formdata.email, formdata.password);

        //   const status = await isAuthenticated();
          if (response.status === 200) {
            const status = await isAuthenticated();
            setUserstatus(status);
    
            if (userstatus) {
              console.log('User is logged in');
              navigate('/search');
            }
          } else {
            alert('Login failed. Please try again.');
          }
        }
      }


    return (
        <>
            {/* <Navbar /> */}
            <div className="Login">
                <form>
                <h1>Login</h1>
                {/* <label htmlFor="email">Email</label> */}
                <input type="email" name="email" placeholder="Email ID" value={formdata.email} onChange={handleChange} required/>
                {/* <label htmlFor="password">Password</label> */}
                <input type="password" name="password" placeholder="Password" value={formdata.password} onChange={handleChange} required/>
                <button className='submit' onClick={handleSubmit}>Submit</button>
                </form>
                <p className='signuptext'>Don't have an account yet? <Link to='/signup'>Signup</Link> or <Link to='/'>Home</Link></p>
            </div>
        </>

        );
}

export default Login;

// async function postLogin(email, password) {

//     // const csrfToken = localStorage.getItem('csrfToken');
//     const csrfToken = getCookie('csrftoken');

//     const response = await fetch(`${API_HOST}/api/login/`, {
//         method: 'POST',
//         headers: {
//         'X-CSRFToken': csrfToken,
//         'Content-Type': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify({
        
//         email: email,
//         password: password,

//         })
//     });
//     const data = await response.json();
//     // console.log(data.detail);
//     // console.log(data.result);
//     return data.result;
//     }
