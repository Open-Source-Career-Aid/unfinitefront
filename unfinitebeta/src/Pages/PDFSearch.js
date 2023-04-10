import React, { useState, useEffect } from "react";
import "../css/PDFSearch.css";
import isAuthenticated from "../Functions/isAuthenticated";
import { useNavigate } from "react-router-dom";
import ProcessURL from "../Components/PDFSearch/ProcessURL";
import DisplayAnswer from "../Components/PDFSearch/DisplayAnswer";
import ReactGA from "react-ga";
import PDFQuestionsContainer from "../Components/PDFSearch/PDFQuestionsContainer";
ReactGA.initialize("G-8YXPLS55QD");

function PDFSearch() {
  const [userstatus, setUserstatus] = useState(null);
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const [dataloaded, setDataloaded] = useState(false);
  const [docid, setDocid] = useState(null);
  const answer =
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const [QnA, setQnA] = useState(new Map());
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    console.log("PDFSearch page loaded");
    const checkUserStatus = async () => {
      const authenticated = await isAuthenticated();
      setUserstatus(authenticated);
      if (!authenticated) {
        navigate("/login");
      }
    };
    checkUserStatus();
  }, [userstatus]);

  useEffect(() => {
    if (dataloaded && docid !== null) {
      // do something here
    }
  }, [dataloaded]);

  const handleClick = () => {
    setDataloaded(false);
    setDocid(null);
    setUrl(null);
    navigate("/pdfsearch");
  };

  return (
    <div className="pdfsearch">
      <div className="headerpdfsearch">
        <h1 className="logopdfsearch">unfinite</h1>
        <div>
          {dataloaded ? (
            <button className="headerbutton" onClick={handleClick}>
              load another pdf
            </button>
          ) : null}
        </div>
      </div>
      <div className="body">
        <div className="pdfurlcontainer">
          {dataloaded ? (
            <>PDF was loaded. Answering based on {url}</>
          ) : (
            <ProcessURL
              dataloaded={dataloaded}
              setDataloaded={setDataloaded}
              setDocid={setDocid}
              url={url}
              setUrl={setUrl}
            />
          )}
        </div>
        {dataloaded ? (
          <div className="chatcontainer">
            <div className="askcontainer">
              <PDFQuestionsContainer QnA={QnA} setQnA={setQnA} docid={docid} />
            </div>
            <div className="answercontainer">
              {dataloaded ? <DisplayAnswer answer={answer} /> : null}
            </div>
          </div>
        ) : null}
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default PDFSearch;
