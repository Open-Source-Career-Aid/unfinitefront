import React from "react";
import getCookie from "./getCookie";
import getCSRF from "./getCSRF";
import { API_URL } from "../API_URL";

async function getSearchresults(id, topicid, questionid) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    // console.log(csrfToken);
  
    const response = await fetch(`${API_URL}summary/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      crossDomain: true,
      body: JSON.stringify({
        id: id,
        topic: topicid,
        question: questionid,
      })
    });
  
    const data = await response.json();
    console.log(data);
  
    return data;
  }
  
  export default getSearchresults;