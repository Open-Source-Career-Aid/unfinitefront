import React from "react";
import getCookie from "./getCookie";
import getCSRF from "./getCSRF";
import { API_URL } from "../API_URL";

async function getSearchresults(id, topicid) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    console.log(csrfToken);
  
    const response = await fetch(`${API_URL}search/`, {
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
      })
    });
  
    const data = await response.json();
    console.log(data.serp);
  
    return data.serp;
  }
  
  export default getSearchresults;