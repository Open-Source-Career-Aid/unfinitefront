import React from "react";
import getCSRF from "../getCSRF";
import { API_URL } from "../../API_URL";
import getCookie from "../getCookie";

async function answerQuestion( question, docids, threadid , special_id ) {
  getCSRF();
  const csrfToken = getCookie("csrftoken");

  const response = await fetch(`${API_URL}summarize_document/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    credentials: "include",
    crossDomain: true,
    body: JSON.stringify({
      'question': question,
      'docids': JSON.stringify(docids),
      'threadid': threadid,
      'special_id': special_id,
    }),
  }).then(response => response.json()).catch(error => console.log(error));

  const data = response;
  console.log(data.answer);

  return data.answer;
}

export default answerQuestion;
