import React, { useState, useEffect } from "react";
import ProcessPDF from "../../Functions/PDFSearch/ProcessPDF";

function ProcessURL({ dataloaded, setDataloaded, setDocid, url, setUrl }) {
  const [loadalert, setloadAlert] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (processing) {
      return;
    }
    const url = document.getElementsByName("url")[0].value;
    setUrl(url);
  };

  useEffect(() => {
    if (url !== null && url.slice(-4) === ".pdf") {
      console.log("send pdf");
      setloadAlert(
        "Please wait while we process your PDF...it might take a while"
      );
      setProcessing(true);
      const getPDFdata = async () => {
        const data = await ProcessPDF({ url });
        setDataloaded(true);
        setDocid(data);
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
          <div className="loader">{alert}</div>
        ) : (
          <form onSubmit={handleSubmit} className="urlsubmit">
            <input
              type="text"
              placeholder="Enter a URL that ends with .pdf. PLEASE ONLY LOAD PUBLICLY AVAILABLE PDFs."
              name="url"
            />
            <button type="submit">Analyze</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProcessURL;
