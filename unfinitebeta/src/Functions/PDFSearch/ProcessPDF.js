import React from "react";
import { API_URL } from "../../API_URL";
import getCookie from "../getCookie";
import getCSRF from "../getCSRF";

async function ProcessPDF({ url }) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    // console.log(csrfToken);

    console.log('url', url);

    const response = await fetch(`${API_URL}index_document/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        crossDomain: true,
        body: JSON.stringify({ 
            'url': url
         }),
    });

    const data = await response.json();
    // check if response is ok
    if (!response.ok) {
        console.log('error', data);
        return null;
    }
    else {
        console.log('success', data);
        // console.log(data.document_id);

        // return (JSON.parse(data.completion), JSON.parse(data.track));
        return [data.document_id, data.thread_id];
    }

}

export default ProcessPDF;
