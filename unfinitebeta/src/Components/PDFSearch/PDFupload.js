// import React, { useState } from "react";

// function PdfUpload() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("pdf", selectedFile);
//     // call API or upload to server using formData
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="file"
//         id="pdf"
//         accept=".pdf"
//         onChange={handleSubmit}
//       />
//       {/* <button type="submit" disabled={!selectedFile}>
//         Upload
//       </button> */}
//     </form>
//   );
// }

// export default PdfUpload;

import React, { useState } from 'react';
import { API_URL } from "../../API_URL";
import getCookie from "../../Functions/getCookie";
import getCSRF from "../../Functions/getCSRF";

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
      // if file is not null do the getCSRF and fetch else alert user to upload a file
      if (file === null) {
        alert("Please select a file to upload");
        return;
      }
       // file is larger than 16MB
      else if (file.size > 16777216){
        alert("File is too large. Please upload a file smaller than 16MB.");
        return;
      }
      else {
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
        const searchForm = document.querySelector('.urlsubmit');
        const inputBox = document.querySelector('input[name="url"]');
        searchForm.reset();
        inputBox.value = file.name;
        // invoke the form for processing url
        searchForm.requestSubmit();
        // searchForm.dispatchEvent(new Event('submit'));
        
        // Just in case the user wants to upload the same file again
        return [data.document_id, data.thread_id];
      } else {
        alert('Failed to upload PDF file.');
        console.log(response.status);
        return null;
      }
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