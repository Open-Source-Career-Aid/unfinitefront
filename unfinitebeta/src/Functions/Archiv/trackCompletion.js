import React from "react";
import { API_URL } from "../API_URL";
import getCookie from "../Functions/getCookie";
import getCSRF from "../Functions/getCSRF";

async function trackCompletion(roadmapid) {

  await getCSRF();
  const csrftoken = getCookie("csrftoken");

  const response = await fetch(`${API_URL}completion/track/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
	body: JSON.stringify({id: roadmapid}),
    credentials: "include",
    crossDomain: true,
  });

  const data = await response.json();
  console.log(data);

  return data;
}

export default trackCompletion;