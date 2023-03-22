import React, { useState , useEffect } from 'react';
import '../css/Roadmap.css';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import FeedbackBox from './FeedbackBox';
import QuestionsContainer from './QuestionsContainer';
import RoadmapContainer from './RoadmapContainer';

function Roadmap() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [query, setQuery] = useState(queryParams.get('query'));
    const [roadmap, setRoadmap] = useState([]);
    const [roadmapid, setRoadmapid] = useState(null);
    const [topicid, setTopicid] = useState(null);
    const [completion, setCompletion] = useState([null]);
    const [tracking, setTracking] = useState(false);
    const [twothirdHeight, setTwothirdHeight] = useState('100vh');

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

                <div className='twothird' style={{ height: twothirdHeight }}>
                  <h1 className='heading'>WE WILL COVER...</h1>

                  {topicid !== null ? <QuestionsContainer queryid={roadmapid} topicid={topicid} /> : null}
                  
                </div>

            </div>
            </div>
        </>

    )
}

export default Roadmap;