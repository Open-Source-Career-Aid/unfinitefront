import React from "react";
import { API_URL } from "../../API_URL";

async function likeDislikeAnswer(QAhash, tms) {
  const response = await fetch(`${API_URL}likedislike/`, {
    method: "POST",
    body: JSON.stringify({
      QAhash: QAhash,
      tms: tms,
    }),
  })
    .then((response) => {
      response.json();
      console.log(response.json);
    })
    .catch((error) => console.log(error));
}

export default likeDislikeAnswer;
