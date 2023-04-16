import React from 'react';
import { useState } from 'react';
import getCSRF from './getCSRF';
import getCookie from './getCookie';
import { API_URL } from '../API_URL';

async function updateTopicCompletion(queryid , topicindex) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    console.log(csrfToken);

    console.log(queryid, topicindex);

    const response = await fetch(`${API_URL}completion/modify/`, {
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
        })
      });

    const data = await response.json();
    console.log(data);

    return [];
}

export default updateTopicCompletion;