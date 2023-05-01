import React, { useState, useEffect } from "react";
import ProcessPDF from "../../Functions/PDFSearch/ProcessPDF";
import { useNavigate } from "react-router-dom";
import PdfUpload from "../PDFSearch/PDFupload";
import { event } from "react-ga";

function ProcessURL({ dataloaded, setDataloaded, setDocid, url, setUrl , threadid , setThreadid , setTitle }) {
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
        setTitle(data[2]);
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
            <div className="instructions">
              <h3>Learning made easy!</h3>
              <p>1. Paste a link to a PDF in the search bar.</p>
              <p className="instruction">2. Click on the <span className="signaturebutton" style={{margin:'5px', cursor:'auto'}}></span> button or press <span style={{'font-weight':'bold', 'margin-left':'5px'}}>ENTER</span>.</p>
              <p>3. Learn from your document your own way!</p>
            </div>
            <div className="input-container">
              <input
                className="urlinput"
                type="text"
                placeholder="Enter a URL ending in .pdf"
                name="url"
              />
              <button type="submit"><span className="signaturebutton"></span></button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProcessURL;
