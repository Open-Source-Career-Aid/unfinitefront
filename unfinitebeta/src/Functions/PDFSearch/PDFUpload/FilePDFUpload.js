import React, { useState, useRef } from 'react';
import UploadPDFFormUI from "../../../Components/PDFSearch/PDFuploadForm";
import UploadFormData from './UploadFormData';
import { event } from 'react-ga';

function UploadPDForm() {
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
        } else {
            formData.append('pdf', file);
            formData.append('fileName', file.name);
            const data = await UploadFormData({ FormData: formData, setProcessing });
            return data;
        }
        } catch (error) {
        alert('Failed to upload PDF file: ' + error.message);
        }
    };

    const handleFileButton = (event) => {
            // we need to click the submit button for the form to submit
        console.log(file);
        if ( file && file.size <= 4194304) {
                console.log(event.target.parentNode.nextElementSibling);
                event.target.parentNode.nextElementSibling.click();
                alert("Your document is being uploaded. Please wait for the confirmation message.")
                setloadAlert(
                    "Please wait while we upload your PDF...it might take a while to upload."
                );
                setProcessing(true);
                return;
                }
        else if (file === null) {
            return;
        }
        else {
                alert("File is too large. Please upload a file smaller than 4MB.");
                setFile(null);
                event.target.value = null;
                return;
                }
        }
    
    return (<> 
    < UploadPDFFormUI 
        processing={processing}
        loadalert={loadalert}
        handleFileChange={handleFileChange}
        handleFileButton={handleFileButton}
        handleSubmit={handleSubmit}
        fileInputRef={fileInputRef} /> </>) ;
}
export default UploadPDForm;