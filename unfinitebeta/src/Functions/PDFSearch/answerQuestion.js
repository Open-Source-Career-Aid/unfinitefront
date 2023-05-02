import React from "react";
import getCSRF from "../getCSRF";
import { API_URL } from "../../API_URL";
import getCookie from "../getCookie";

async function answerQuestion( question, docids, threadid) {

  let special_text = null;
  let special_id = null;

  // finr the text followed by sr: in the question and set it to special_text and modify the question to be just the question. If it includes multiple sr: then it will just take the last one.
  if (question.includes("sr:")) {
    special_text = question.split("sr:")[1];
    question = question.split("sr:")[0].trim();
  }

  console.log("special_text:", special_text);

  if (special_text==='Simplify') {
    special_id = 1
  }
  else if (special_text==='Analogify') {
    special_id = 4;
  }
  else if (special_text==='Comprehensify') {
    special_id = 3;
  }

  console.log("querying thingy:", question, docids, threadid, special_id);

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
  // console.log(data.answer);

  // if (!response.ok) {
  //   console.log("error", data);
  //   return '';
  // }
  // // console.log("success", data);
  // return data.answer;

  if (data.answer) {
    return data.answer;
  }
  else {
    return '';
  }
}

export default answerQuestion;
