import React, { useState } from 'react';
import { API_URL } from "../../API_URL";
import getCookie from "../../Functions/getCookie";
import getCSRF from "../../Functions/getCSRF";

// upload pdf file to server

function UploadPDFForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
  
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('fileName', file.name);
      console.log(formData.getAll('pdf')[0]);
      await getCSRF();
      const csrfToken = getCookie('csrftoken');
      const response = await fetch(`${API_URL}index_document/`, {    
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        crossDomain: true,
        body: formData,

    })
    const data = await response.json();
      if (response.ok) {
        alert('PDF file uploaded successfully!');
        return [data.document_id, data.thread_id];
      } else {
        alert('Failed to upload PDF file.');
        console.log(response.status);
        return null;
      }
    } catch (error) {
      alert('Failed to upload PDF file: ' + error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} enctype="multipart/form-data">
      <label>
        Select a PDF file:
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadPDFForm;