import React from 'react';
import { useState } from 'react';
import getCSRF from './getCSRF';
import getCookie from './getCookie';
import { API_URL } from '../API_URL';


async function getTopicCompletion({ queryid }) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    console.log(csrfToken);

    const response = await fetch(`${API_URL}completion/?id=${queryid}`, {
        method: 'GET',
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        crossDomain: true
    });

    const data = await response.json();
    console.log(data);

    return JSON.parse(data.completion);

}


export default getTopicCompletion;