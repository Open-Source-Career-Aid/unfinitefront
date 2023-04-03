import React from "react";
import getCookie from "./getCookie";
import getCSRF from "./getCSRF";
import { API_URL } from "../API_URL";

async function getRoadmap(query) {

  await getCSRF();
  const csrfToken = getCookie('csrftoken');
  console.log(csrfToken);

  const response = await fetch(`${API_URL}query/`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    crossDomain: true,
    body: JSON.stringify({
      query_text: query,
    })
  });

  const data = await response.json();
  // console.log(data.id);

  return [data.id, JSON.parse(data.skeleton)];
}

export default getRoadmap;