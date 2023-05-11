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
import Discordbranding from "../Components/PDFSearch/Discordbranding";
import Outline from "../Components/PDFSearch/Outline";
ReactGA.initialize("G-8YXPLS55QD");

function PDFSearch() {
  const [userstatus, setUserstatus] = useState(null);
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const [dataloaded, setDataloaded] = useState(false);
  const [docid, setDocid] = useState(null);
  const [answer, setAnswer] = useState("");
  const [currentquestion, setCurrentquestion] = useState('');
  const [threadid, setThreadid] = useState(null);
  const [QnA, setQnA] = useState(new Map());
  const [qids, setQids] = useState([]);
  const [selectedQuestionID, setSelectedQuestionID] = useState(null);
  const [nextquestion, setNextquestion] = useState(null);
  const [title, setTitle] = useState(null);
  const [answerisgenerating, setAnswerisgenerating] = useState(false);
  const [urls, setUrls] = useState('');
  const [relevantqs, setRelevantqs] = useState('');

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
    setTitle(null);
    setQnA(new Map());
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

  const handleNewPDF = () => {
    setQnA(new Map());
    setAnswer("");
    setDataloaded(false);
    setDocid(null);
    setUrl(null);
    setThreadid(null);
    setTitle(null);
    navigate("/");
  };

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  return (
    <div className="pdfsearch">
      <div className="headerpdfsearch">
        <div className="logocontainer">
          <h1 className="logopdfsearch" onClick={handleNewPDF}>unfinite</h1>
        </div>
        <div className="docinfo">
          <h3 className="title">{title}</h3>
          <div>
            {dataloaded ? (
              <button className="closedoc" onClick={handleNewPDF}>
                x
              </button>
            ) : null}
          </div>
        </div>
        <div className="right-side-header">
          <Discordbranding />
          <button className="headerbutton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="body">
        <div className="pdfurlcontainer">
          {dataloaded ? (
            <>
              {/* PDF was loaded. Answering based on <b>{title}</b>{" "}
              <a href="https://forms.gle/6JU7uBvXHe4WMRhK7" target="_blank">
                ARE YOU A RESEARCHER?
              </a> */}
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
              setTitle={setTitle}
            />
            <div className="examples-container">
              <ExamplesBox setUrl={setUrl} />
            </div>
            <div style={
              {
                "width": "50%"
              }
            }>
              {/* <Suggestions 
              setUrl={setUrl}
              setAnswer={setAnswer}
              setQnA={setQnA}
              setDataloaded={setDataloaded}
              docid={docid}
              setDocid={setDocid}
              setThreadid={setThreadid}
              isRow={true}
              /> */}
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
                selectedQuestionID={selectedQuestionID}
                setSelectedQuestionID={setSelectedQuestionID}
                nextquestion={nextquestion}
                setNextquestion={setNextquestion}
                setCurrentquestion={setCurrentquestion}
                setAnswerisgenerating={setAnswerisgenerating}
                answerisgenerating={answerisgenerating}
                urls={urls}
                setUrls={setUrls}
                relevantqs={relevantqs}
                setRelevantqs={setRelevantqs}
              />
            </div>
            <div className="answercontainer">
              {dataloaded ? <>
              <DisplayAnswer answer={answer}
              nextquestion={nextquestion}
              setNextquestion={setNextquestion}
              currentquestion={currentquestion}
              setCurrentquestion={setCurrentquestion}
              answerisgenerating={answerisgenerating}
              setAnswerisgenerating={setAnswerisgenerating}
              urls={urls}
              setUrls={setUrls}
              relevantqs={relevantqs}
              setRelevantqs={setRelevantqs}
              /></> : null}
            </div>
            <div style={
              {
                'width': "25%"
              }
            }>
            <Outline docid={docid} setNextquestion={setNextquestion} 
            answerisgenerating={answerisgenerating} setAnswerisgenerating={setAnswerisgenerating} />
            <Suggestions 
            setUrl={setUrl}
            setAnswer={setAnswer}
            setQnA={setQnA}
            setDataloaded={setDataloaded}
            docid={docid}
            setDocid={setDocid}
            setThreadid={setThreadid}
            isRow={false}
            setTitle={setTitle}
            />
            {/* <DocOutline /> */}
            </div>
          </div>
        ) : null}
      </div>
      <div className="feedbackcontainer">
        <FeedbackBox />
      </div>
      <div className="footer">
        <a href="https://forms.gle/6JU7uBvXHe4WMRhK7" target="_blank" className="uaresearcher" rel="noreferrer">
          ARE YOU A RESEARCHER?
        </a>
        <p className="limitedaccess">LIMITED ACCESS © 2023 unfinite</p>
      </div>
    </div>
  );
}

export default PDFSearch;
