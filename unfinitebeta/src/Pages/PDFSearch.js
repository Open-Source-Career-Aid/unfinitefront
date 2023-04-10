import React, { useState, useEffect } from "react";
import "../css/PDFSearch.css";
import isAuthenticated from "../Functions/isAuthenticated";
import { useNavigate } from "react-router-dom";
import ProcessURL from "../Components/PDFSearch/ProcessURL";
import DisplayAnswer from "../Components/PDFSearch/DisplayAnswer";
import ReactGA from "react-ga";
import PDFQuestionsContainer from "../Components/PDFSearch/PDFQuestionsContainer";
import FeedbackBox from "../Components/FeedbackBox";
ReactGA.initialize("G-8YXPLS55QD");

function PDFSearch() {
  const [userstatus, setUserstatus] = useState(null);
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const [dataloaded, setDataloaded] = useState(false);
  const [docid, setDocid] = useState(null);
  const [answer, setAnswer] = useState("");
//   const answer =
//     "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const [QnA, setQnA] = useState(new Map());
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    console.log("PDFSearch page loaded");
    setQnA(new Map());
    setAnswer("");
    setUrl(null);
    setDataloaded(false);
    setDocid(null);
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
    setQnA(new Map());
    setAnswer("");
    setDataloaded(false);
    setDocid(null);
    setUrl(null);
    navigate("/");
  };
  
    const handleOldapp = () => {
        navigate("/oldapp");
    };

  return (
    <div className="pdfsearch">
      <div className="headerpdfsearch">
        <div className="logocontainer">
            <h1 className="logopdfsearch">unfinite</h1>
            <div>
            {dataloaded ? (
                <button className="headerbutton" onClick={handleClick}>
                load another pdf
                </button>
            ) : null}
            </div>
        </div>
        <div>
            {/* <button className="headerbutton" style={{backgroundColor: "#ffd500", color: "#000000"}} onClick={()=>navigate('/premium')}>
                Premium
            </button> */}
            <button className="headerbutton" onClick={handleOldapp} style={{backgroundColor: "#979797"}}>
                Old App
            </button>
        </div>
      </div>
      <div className="body">
        <div className="pdfurlcontainer">
          {dataloaded ? (
            <>PDF was loaded. Answering based on {url} <a href="https://forms.gle/6JU7uBvXHe4WMRhK7" target="_blank" >ARE YOU A RESEARCHER?</a></>
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
                <h3>Thread</h3>
              <PDFQuestionsContainer QnA={QnA} setQnA={setQnA} docid={docid} setAnswer={setAnswer} answer={answer}/>
            </div>
            <div className="answercontainer">
              {dataloaded ? <DisplayAnswer answer={answer} /> : null}
            </div>
          </div>
        ) : null}
      </div>
      <div className="feedbackcontainer">
        <FeedbackBox />
      </div>
      <div className="footer">
        <p>LIMITED EXCESS TO BROWN UNIVERSITY © 2023 unfinite</p>
      </div>
    </div>
  );
}

export default PDFSearch;
