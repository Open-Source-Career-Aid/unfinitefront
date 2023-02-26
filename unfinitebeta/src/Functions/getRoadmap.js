import React from "react";
import getCookie from "./getCookie";
import getCSRF from "./getCSRF";

const API_URL = "http://127.0.0.1:8000";

function getRoadmap(query) {

    // getCSRF();
    const csrfToken = getCookie('csrftoken');
  
    fetch(`${API_URL}/api/query/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        query_text: query,
      })
    })
    .then(response => { return response.json()})
    .then(data => {
      return data.result;
    });
    return null;
  }

export default getRoadmap;