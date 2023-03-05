import React from 'react';
import { useState } from 'react';
import getCSRF from './getCSRF';
import getCookie from './getCookie';
import { API_URL } from '../API_URL';

async function sendFeedbackSerp({queryid, topicindex, serpindex, thumbs}) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    console.log(csrfToken);

    console.log('inside the function:', queryid, topicindex, serpindex, thumbs);

    const response = await fetch(`${API_URL}feedback/serp/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        crossDomain: true,
        body: JSON.stringify({
          id: queryid,
          topic: topicindex,
          serp: serpindex,
          thumb: thumbs,
        })
      });

    const data = await response.json();
    console.log(data);

    return [];
}

export default sendFeedbackSerp;