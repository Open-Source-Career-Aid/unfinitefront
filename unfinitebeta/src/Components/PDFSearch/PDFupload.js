import React, { useState } from "react";

function PdfUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("pdf", selectedFile);
    // call API or upload to server using formData
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        id="pdf"
        accept=".pdf"
        onChange={handleSubmit}
      />
      {/* <button type="submit" disabled={!selectedFile}>
        Upload
      </button> */}
    </form>
  );
}

export default PdfUpload;