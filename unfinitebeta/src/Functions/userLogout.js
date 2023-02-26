import React from 'react';
import getCSRF from "./getCSRF";
import getCookie from './getCookie';

const API_HOST = 'http://localhost:8000';

// function that logs out the user session

function logout() {

    const csrfToken = getCookie('csrftoken');
    
    fetch(`${API_HOST}/api/logout/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    });
  }
  
export default logout;