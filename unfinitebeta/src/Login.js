import React, { useState} from "react";
import "./Login.css";

// a form that takes in email and password, stores it in a constant, and then sends it to the backend

function Login() {

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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Login form submitted");
    }

    return (
        <div className="Login">
            <form>
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formdata.email} onChange={handleChange} required/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formdata.password} onChange={handleChange} required/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default Login;