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
        const inputBox = document.querySelector('input[name="url"]');
        searchForm.reset();
        inputBox.value = FormData.get("pdf").name;
        // invoke the form for processing url
        searchForm.requestSubmit();
        // Just in case the user wants to upload the same file again
        return [data.document_id, data.thread_id];
    } else {
        alert('Failed to upload PDF file.');
        console.log(response.status);
        return null;
    }
}

export default UploadFormData;
