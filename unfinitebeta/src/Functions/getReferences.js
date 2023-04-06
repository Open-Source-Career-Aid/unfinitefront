import React from "react";
import getCookie from "./getCookie";
import getCSRF from "./getCSRF";
import { API_URL } from "../API_URL";

async function getReferences(id, topicid, questionid, answertype) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    // console.log(csrfToken);
  
    const response = await fetch(`${API_URL}references/`, {
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
        answertype: answertype,
        question: questionid,
      })
    });
  
    const data = await response.json();
    // console.log(data);
  
    return JSON.parse(data.urls);
  }
  
  export default getReferences;