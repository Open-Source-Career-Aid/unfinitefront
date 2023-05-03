import React from "react";
import getCSRF from "../getCSRF";
import { API_URL } from "../../API_URL";
import getCookie from "../getCookie";

async function answerQuestion( question, docids, threadid) {

  let specialText = null;
  let specialID = null;

  // finr the text followed by sr: in the question and set it to specialText and modify the question to be just the question. If it includes multiple sr: then it will just take the last one.
  if (question.includes("sr:")) {
    specialText = question.split("sr:")[1];
    question = question.split("sr:")[0].trim();
  }

  console.log("specialText:", specialText);

  if (specialText==='Simplify') {
    specialID = 1
  }
  else if (specialText==='Analogify') {
    specialID = 4;
  }
  else if (specialText==='Comprehensify') {
    specialID = 3;
  }

  console.log("querying thingy:", question, docids, threadid, specialID);

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
      'specialID': specialID,
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
