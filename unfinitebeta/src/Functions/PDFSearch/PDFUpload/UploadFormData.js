import React from "react";
import { API_URL } from "../../../API_URL";
import getCookie from "../../getCookie";
import getCSRF from "../../getCSRF";

async function UploadFormData({ FormData, setProcessing }) {
    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    const response = await fetch(`${API_URL}index_document/`, {    
            method: 'POST',
            headers: {
            'X-CSRFToken': csrfToken,
            },
            credentials: 'include',
            crossDomain: true,
            body: FormData,

        });

        const data = await response.json();
    if (response.ok) {
        alert('PDF file uploaded successfully!');
        setProcessing(false);
        const searchForm = document.querySelector('.urlsubmit');
        console.log(searchForm, "searchForm from UploadFormData.js");
        console.log(data);
        return [data.document_id, data.thread_id, data.title];
    } else {
        alert('Failed to upload PDF file.');
        console.log(response.status);
        return null;
    }
}

export default UploadFormData;
