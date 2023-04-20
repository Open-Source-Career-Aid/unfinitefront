import React from "react";
import getCSRF from "../getCSRF";
import { API_URL } from "../../API_URL";
import getCookie from "../getCookie";

async function gscholarresults( query ) {
  getCSRF();
  const csrfToken = getCookie("csrftoken");

  const response = await fetch(`${API_URL}searchgooglescholar/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    credentials: "include",
    crossDomain: true,
    body: JSON.stringify({
      'query': query,
    }),
  }).then(response => response.json()).catch(error => console.log(error));

  const data = response;

  console.log('parsed', JSON.parse(data.detail));

  return JSON.parse(data.detail)
}

export default gscholarresults;