import React, { useState, useEffect } from "react";
import "../css/PDFSearch.css";
import isAuthenticated from "../Functions/isAuthenticated";
import { useNavigate } from "react-router-dom";
import ProcessURL from "../Components/PDFSearch/ProcessURL";
import DisplayAnswer from "../Components/PDFSearch/DisplayAnswer";
import ReactGA from "react-ga";
import PDFQuestionsContainer from "../Components/PDFSearch/PDFQuestionsContainer";
import FeedbackBox from "../Components/FeedbackBox";
import userLogout from "../Functions/userLogout";
import ExamplesBox from "../Components/PDFSearch/ExamplesBox";
import Suggestions from "../Components/PDFSearch/Suggestions";
import { useLocation } from "react-router-dom";
ReactGA.initialize("G-8YXPLS55QD");

function PDFSearch() {
  const [userstatus, setUserstatus] = useState(null);
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const [dataloaded, setDataloaded] = useState(false);
  const [docid, setDocid] = useState(null);
  const [answer, setAnswer] = useState("");
  const [threadid, setThreadid] = useState(null);
  const [QnA, setQnA] = useState(new Map());
  const [qids, setQids] = useState([]);
  const [selectedqid, setSelectedqid] = useState(null);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    // console.log("PDFSearch page loaded");
    console.log("This runs");
    setQnA(new Map());
    setAnswer("");
    setUrl(null);
    setDataloaded(false);
    setDocid(null);
    setThreadid(null);
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

  // useEffect(() => {
  //   if (dataloaded && docid !== null) {
  //   }
  // }, [dataloaded]);

  const handlenewPDF = () => {
    setQnA(new Map());
    setAnswer("");
    setDataloaded(false);
    setDocid(null);
    setUrl(null);
    setThreadid(null);
    navigate("/");
  };

  const handleLogout = () => {
    userLogout();
    navigate("/login");
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
              <button className="headerbutton" onClick={handlenewPDF}>
                load another pdf
              </button>
            ) : null}
          </div>
        </div>
        <div>
          <button className="headerbutton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="body">
        <div className="pdfurlcontainer">
          {dataloaded ? (
            <>
              PDF was loaded. Answering based on {url}{" "}
              <a href="https://forms.gle/6JU7uBvXHe4WMRhK7" target="_blank">
                ARE YOU A RESEARCHER?
              </a>
            </>
          ) : (
            <>
            <ProcessURL
              dataloaded={dataloaded}
              setDataloaded={setDataloaded}
              setDocid={setDocid}
              url={url}
              setUrl={setUrl}
              threadid={threadid}
              setThreadid={setThreadid}
            />
            <ExamplesBox setUrl={setUrl} />
            <div style={
              {
                'width': "50%"
              }
            }>
              <Suggestions 
              setUrl={setUrl}
              setAnswer={setAnswer}
              setQnA={setQnA}
              setDataloaded={setDataloaded}
              setDocid={setDocid}
              setThreadid={setThreadid}
              isRow={true}
              />
              </div>
            </>
          )}
        </div>
        {dataloaded ? (
          <div className="chatcontainer">
            <div className="askcontainer">
              <h3>Thread</h3>
              <PDFQuestionsContainer
                QnA={QnA}
                setQnA={setQnA}
                docid={docid}
                setAnswer={setAnswer}
                answer={answer}
                threadid={threadid}
                qids={qids}
                setQids={setQids}
                selectedqid={selectedqid}
                setSelectedqid={setSelectedqid}
              />
            </div>
            <div className="answercontainer">
              {dataloaded ? <DisplayAnswer answer={answer} /> : null}
            </div>
            <div style={
              {
                'width': "25%"
              }
            }>
            <Suggestions 
            setUrl={setUrl}
            setAnswer={setAnswer}
            setQnA={setQnA}
            setDataloaded={setDataloaded}
            setDocid={setDocid}
            setThreadid={setThreadid}
            isRow={false}
            />
            </div>
          </div>
        ) : null}
      </div>
      <div className="feedbackcontainer">
        <FeedbackBox />
      </div>
      <div className="footer">
        <a href="https://forms.gle/6JU7uBvXHe4WMRhK7" target="_blank">
          ARE YOU A RESEARCHER?
        </a>
        <p className="limitedaccess">LIMITED ACCESS © 2023 unfinite</p>
      </div>
    </div>
  );
}

export default PDFSearch;
