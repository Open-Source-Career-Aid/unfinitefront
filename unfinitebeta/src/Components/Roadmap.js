import React, { useRef, useState , useEffect } from 'react';
import '../css/Roadmap.css';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import FeedbackBox from './FeedbackBox';
import QuestionsContainer from './QuestionsContainer';
import RoadmapContainer from './RoadmapContainer';
import Button from './Button';

function Roadmap() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [query, setQuery] = useState(queryParams.get('query'));
    const [roadmap, setRoadmap] = useState([]);
    const [roadmapid, setRoadmapid] = useState(null);
    const [topicid, setTopicid] = useState(null);
    const [completion, setCompletion] = useState([null]);
    const [tracking, setTracking] = useState(false);
    // const [twothirdHeight, setTwothirdHeight] = useState('100vh');
    // const [answertype, setAnswertype] = useState(0);

    // useEffect(() => {

    //   console.log('answertype:', answertype);

    // }, [answertype]);

    // const handleAnswertype = (e) => {
    //   setAnswertype(e.target.value);
    // }

    return (
        <>
          <div className='bodyroadmap'>
            <Navbar page={'navbardark'}/>
            <div className='roadmap'>

                <div className='onethird'>
                  <h1 className='heading'>ROADMAP ON</h1>
                    <RoadmapContainer query={query} setQuery={setQuery} roadmapid={roadmapid} setRoadmapid={setRoadmapid}
                    roadmap={roadmap} setRoadmap={setRoadmap} topicid={topicid} setTopicid={setTopicid} completion={completion}
                    setCompletion={setCompletion} tracking={tracking} setTracking={setTracking}/>
                    <FeedbackBox query={query} queryid={roadmapid} initialfeedbackstate={true}/>
                </div>

                <div className='twothird'>
                  <h1 className='heading'>WE WILL COVER...</h1>

                  {/* <div className='summary'>
                    <div className='summary-customisations'>
                        <div className='summary-text'>
                          <p>Answer type: </p>
                        </div>
                        <div>Quick
                        <input type='radio' name='answertype' value={1} onClick={handleAnswertype} className='button-answertype'/>
                        </div>
                        <div>
                        Detailed
                        <input type='radio' name='answertype' value={2} onClick={handleAnswertype} className='button-answertype'/>
                        </div>
                        <div>
                        Simplified
                        <input type='radio' name='answertype' value={3} onClick={handleAnswertype} className='button-answertype'/>
                        </div>
                    </div>
                  </div> */}

                  {topicid !== null ? (
                  <div style={{ width: '100%' }}>
                    <QuestionsContainer queryid={roadmapid} topicid={topicid}/>
                  </div>) : null}

                  <div className='footer'></div>
                  
                </div>

            </div>
            </div>
        </>

    )
}

export default Roadmap;