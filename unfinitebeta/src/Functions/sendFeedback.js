import React from 'react';
import { useState } from 'react';
import getCSRF from './getCSRF';
import getCookie from './getCookie';
import { API_URL } from '../API_URL';

async function sendFeedback(queryid, feedback) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    console.log(csrfToken);

    const response = await fetch(`${API_URL}feedback/query/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        crossDomain: true,
        body: JSON.stringify({
          id: queryid,
          feedback_text: feedback,
        })
      });

    const data = await response.json();
    console.log(data);

    return data;
}

export default sendFeedback;