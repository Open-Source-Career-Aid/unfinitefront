import React, { useState, useRef } from 'react';
import { API_URL } from "../../API_URL";
import getCookie from "../../Functions/getCookie";
import getCSRF from "../../Functions/getCSRF";
import {ImFolderUpload} from 'react-icons/im';
import { event } from 'react-ga';

function UploadPDFForm() {
  const [file, setFile] = useState(null);
  const [loadalert, setloadAlert] = useState(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to upload this file?")){
      console.log(event.target.parentNode.parentNode)
      const selectedFile = event.target.files[0];
      console.log(selectedFile);
      setFile(selectedFile);
      
    }
    else{
      setFile(null);
      event.target.value = null;
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      // if file is not null do the getCSRF and fetch else alert user to upload a file
      console.log(file, "file")
      if (file === null) {
        alert("Please select a file to upload");
        return;
      }
       // file is larger than 16MB
      else if (file.size > 4194304){
        alert("File is too large. Please upload a file smaller than 4MB.");
        setFile(null);
        event.target.value = null;
        return;
      }
      else {

        formData.append('pdf', file);
        formData.append('fileName', file.name);
        console.log(formData.getAll('pdf')[0]);
        console.log(processing, "processing");

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

            });
      

    const data = await response.json();
      if (response.ok) {
        alert('PDF file uploaded successfully!');
        setProcessing(false);
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

  const handleFileButton = (event) => {
    if (event.target.files[0]){
            // we need to click the submit button for the form to submit
            if(event.target.files[0].files < 4194304){
              console.log(event.target.parentNode.nextElementSibling);
              event.target.parentNode.nextElementSibling.click();
              alert("Your document is being uploaded. Please wait for the confirmation message.")
              setloadAlert(
                "Please wait while we upload your PDF...it might take a while to upload."
              );
              setProcessing(true);
            }
            else{
              alert("File is too large. Please upload a file smaller than 4MB.");
              setFile(null);
              event.target.value = null;
            }
    }
  }
  function hideSearchBar() {
    document.querySelector('.urlsubmit').style.display = 'none';
  }
  return (
  <div style={{display:"inline"}}>
  { processing ? ( <> <div className="loader">{loadalert}</div> {hideSearchBar()} </>) : (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'inline' }}>
    <label htmlFor="upload">
      <ImFolderUpload size={25} style={{ marginLeft: '1em', cursor: 'pointer', color: "#40b600" }}/>
      <input type="file" accept=".pdf" onInput={handleFileChange} id="upload" ref={fileInputRef} onChange={handleFileButton} style={{display:"none"}}/>
    </label>
     <button type="submit" style={{display:"none"}}>Upload</button>
  </form>)}
  </div>
  );
}

export default UploadPDFForm;