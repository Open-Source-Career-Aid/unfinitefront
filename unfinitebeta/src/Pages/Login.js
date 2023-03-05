import React, { useState , useEffect} from "react";
import "../css/Authentication.css";
import isAuthenticated from '../Functions/isAuthenticated';
// import saveSessionId from "./saveSessionid";
// import getCSRF from "./getCSRF";
import { useNavigate } from "react-router-dom";
import getCookie from "../Functions/getCookie";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import getCSRF from "../Functions/getCSRF";
import { API_URL } from "../API_URL";

// a form that takes in email and password, stores it in a constant, and then sends it to the backend

async function postLogin(email, password) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');

    return fetch(`${API_URL}login/`, {
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
    });
    //.then(response => {
    //    console.log(response);
    //    return response.json();
    //});
    //.then(data => {
    //    console.log(data);
     //   return data.result;
    //});
}



function Login() {

    const navigate = useNavigate();
    const [userstatus, setUserstatus] = useState(false);

    useEffect(() => {
        console.log("Login page loaded");
    
        const checkUserStatus = async () => {
            const status = await isAuthenticated();
            setUserstatus(status);
            //console.log("userstatus");
            //console.log(userstatus);
    
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
        event.preventDefault();
        if (formdata.email.toString() === "" || formdata.password.toString() === "") {
          alert("Please fill out all fields");
        } 
        else {
          
          //setUserstatus(true);
          let response = await postLogin(formdata.email, formdata.password);
          //console.log('response:')
          //console.log(response);
          //console.log(response.status);
          if (response.status === 200) {
            const status = await isAuthenticated();
            //console.log(status);
            setUserstatus(status);
            //console.log(userstatus);
    
            if (status) {
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
            <div className="bodyauthentication">
                <div className="authentication">
                    <form>
                    <h1 className='h1auth'>Login</h1>
                    {/* <label htmlFor="email">Email</label> */}
                    <input type="email" name="email" placeholder="Email ID" value={formdata.email} onChange={handleChange} required/>
                    {/* <label htmlFor="password">Password</label> */}
                    <input type="password" name="password" placeholder="Password" value={formdata.password} onChange={handleChange} required/>
                    <button className='submit' onClick={handleSubmit}>Submit</button>
                    </form>
                    <p className='authtext'>Don't have an account yet? <Link className="aauth" to='/signup'>Signup</Link> or <Link className="aauth" to='/'>Home</Link></p>
                </div>
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
