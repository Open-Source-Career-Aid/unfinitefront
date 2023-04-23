import React, { useState, useEffect } from "react";
import ProcessPDF from "../../Functions/PDFSearch/ProcessPDF";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import UploadPDFForm from "../PDFSearch/PDFupload";
=======
import PdfUpload from "../PDFSearch/PDFupload";
import { event } from "react-ga";
>>>>>>> bfc0c8b07b730830eec61b05d6cdb29ba8b6c4c7

function ProcessURL({ dataloaded, setDataloaded, setDocid, url, setUrl , threadid , setThreadid }) {
  const [loadalert, setloadAlert] = useState(null);
  const [processing, setProcessing] = useState(false);

  // navigate
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (processing) {
      return;
    }
    const url = document.getElementsByName("url")[0].value;
    setUrl(url);
  };

  useEffect(() => {
    if (threadid !== null) {
      setDataloaded(true);
      navigate(`/?t=${threadid}`);
    }
  }, [threadid]);

  useEffect(() => {
    // event.preventDefault();
    console.log("url", url);
    if (url !== null && url.slice(-4) === ".pdf") {
      console.log("send pdf");
      setloadAlert(
        "Please wait while we process your PDF...it might take a while"
      );
      setProcessing(true);
      const getPDFdata = async () => {
        const data = await ProcessPDF({ url });
        if (data === null) {
          alert("Please enter a valid PDF URL ending with .pdf");
          setDataloaded(false);
          setDocid(null);
          setUrl(null);
          setProcessing(false);
          return;
        }
        console.log("data", data);
        setDocid(data[0]);
        setThreadid(data[1]);
      };
      getPDFdata();
    } else if (url !== null && !url.includes(".pdf")) {
      alert("Please enter a valid PDF URL ending with .pdf");
      setDataloaded(false);
      setDocid(null);
    }
  }, [url]);

  return (
    <div className="processurl">
      {/* a search bar that takes in a url and a button */}
      <div className="searchbar">
        {processing ? (
          <div className="loader">{loadalert}</div>
        ) : (
          <form onSubmit={handleSubmit} className="urlsubmit">
            <input
              type="text"
              placeholder="Enter a URL that ends with .pdf. PLEASE ONLY LOAD PUBLICLY AVAILABLE PDFs."
              name="url"
            />
            <button type="submit">Load Document</button>
          </form>
        )}
        <UploadPDFForm />
      </div>
    </div>
  );
}

export default ProcessURL;
