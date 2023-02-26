import React from "react";
import getCookie from "./getCookie";
import getCSRF from "./getCSRF";

const API_URL = "http://127.0.0.1:8000";

// function getRoadmap(query) {

//     // getCSRF();
//     const csrfToken = getCookie('csrftoken');
  
//     fetch(`${API_URL}/api/query/`, {
//       method: 'POST',
//       headers: {
//         'X-CSRFToken': csrfToken,
//         'Content-Type': 'application/json'
//       },
//       credentials: 'include',
//       body: JSON.stringify({
//         query_text: query,
//       })
//     })
//     .then(response => { return response.json()})
//     .then(data => {
//       return data.result;
//     });
//     return null;
//   }

async function getRoadmap(query) {

  const csrfToken = getCookie('csrftoken');

  const response = await fetch(`${API_URL}/api/query/`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      query_text: query,
    })
  });

  const data = await response.json();

  return data.result;
}

export default getRoadmap;