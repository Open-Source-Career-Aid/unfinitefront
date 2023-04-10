import React from "react";
import getCSRF from "../getCSRF";

async function answerQuestion({ question , docids }) {
    
    getCSRF();
    const csrfToken = getCookie('csrftoken');

    const response = await fetch(`${API_URL}summarize_document/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        crossDomain: true,
        body: JSON.stringify({
            'question': question,
            'docids': docids,
        }),
    });

    const data = await response.json();
    console.log(data.answer);

    return data.answer;
}

export default answerQuestion;