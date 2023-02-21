import React, { useState } from 'react';
import './LandingPage.css';

// create a function that accepts first name, last name, email, password, password confirmation, and a beta key

function signupform() {
    return (
      <div className="signupform">
        <form>
          <label htmlFor="firstname">First Name:</label>
          <input type="text" name="firstname" id="firstname" required />
          <label htmlFor="lastname">Last Name:</label>
          <input type="text" name="lastname" id="lastname" required />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required autoComplete="new-password" />
          <label htmlFor="passwordconfirm">Confirm Password:</label>
          <input type="password" name="passwordconfirm" id="passwordconfirm" required autoComplete="new-password" />
          <label htmlFor="betakey">Beta Key:</label>
          <input type="text" name="betakey" id="betakey" />
          <button type="submit" value="Submit">Sign Up</button>
        </form>
      </div>
    );
  }
  

  function loginform() {
    return (
      <div className="loginform">
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" required autoComplete="current-password" />
          <button type="submit" value="Submit">Log in</button>
        </form>
      </div>
    );
  }
  

function LandingPage() {

    const [userstatus, setUserstatus] = useState(null);

    return (
        <div className="LandingPage">
            {userstatus === null ? <>
            <h1>Unfinite Beta</h1>
            <p>The new way to learn something.</p>
            <button onClick={() => setUserstatus('hasBeta')}>Sign Up</button>
            <button onClick={() => setUserstatus('isUser')}>Sign in</button>
            </> : null}
            {userstatus === 'hasBeta' ? signupform() : null}
            {userstatus === 'isUser' ? loginform() : null}
        </div>
    );
}

export default LandingPage;