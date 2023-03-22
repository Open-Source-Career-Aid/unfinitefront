import React, { useState , useEffect } from 'react';
import '../css/Roadmap.css';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import getCookie from '../Functions/getCookie';
import getCSRF from '../Functions/getCSRF';
import getRoadmap from '../Functions/getRoadmap';
import logout from '../Functions/userLogout';
import { useNavigate } from "react-router-dom";
import isAuthenticated from '../Functions/isAuthenticated';
import getSearchresults from '../Functions/getSearchresults';
import SearchResultCards from './SearchResultsCards';
import FeedbackBox from './FeedbackBox';
import sendFeedbackSerp from '../Functions/sendFeedbackSerp';
import getTopicCompletion from '../Functions/getTopicCompletion';
import updateTopicCompletion from '../Functions/updateTopicCompletion';
import SearchRender from './SearchRender';
import { API_URL } from '../API_URL';
import trackCompletion from '../Functions/trackCompletion';
import QuestionsContainer from './QuestionsContainer';

function Roadmap() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [query, setQuery] = useState(queryParams.get('query'));
    const [userstatus, setUserstatus] = useState(false);
    const navigate = useNavigate();
    const [roadmap, setRoadmap] = useState([]);
    const [roadmapid, setRoadmapid] = useState(null);
    const [searchresults, setSearchresults] = useState([]);
    const [topicid, setTopicid] = useState(null);
    const [thumbs, setThumbs] = useState(null);
    const [completion, setCompletion] = useState([null]);
    const [tracking, setTracking] = useState(false);
    const [twothirdHeight, setTwothirdHeight] = useState('100vh');
    const [serpindex, setSerpindex] = useState(null);
    const [questionscontainer, setQuestionscontainer] = useState(null);

    useEffect(() => {

      const checkAuth = async () => {
        const authenticated = await isAuthenticated();
        setUserstatus(authenticated);
        if (!authenticated) {
          navigate('/login');
        }
      };
    }, [userstatus]);

    useEffect(() => {

      const getRoadmapData = async () => {
        const data = await getRoadmap(query);
        const completionresponse = await getTopicCompletion({queryid: data[0]});
        setRoadmapid(data[0]);
        setRoadmap(data[1]);
        setTopicid(null);
        setCompletion(JSON.parse(completionresponse[1]));
        setTracking(JSON.parse(completionresponse[0]));
        // console.log('completion:', completionresponse);
      };
      getRoadmapData();
    }, [query]);

    const handleTopicClick = (index, event) => {
      event.preventDefault();
      setTopicid(null)
      setTopicid(index);
      console.log('topic', index, "roadmap", roadmapid);
    };

    const roadmaprender = roadmap.map((str, index) => {
       // get completion status for this checkbox
      console.log('completion:::', completion);
      const isCompleted = completion[index] === 1 ? true : false;
      console.log('isCompleted:::', isCompleted, completion[index]);

      const handleCheckboxChange = (event) => {
        // get the current state of the checkbox
        const isChecked = event.target.checked;
        
        // call a function to update the completion status
        console.log('checkbox', index, 'is', roadmapid);
        updateTopicCompletion(roadmapid, index);
      };
    
      return (
        <label key={str} className='topics'>
          <input type="checkbox" name="topicLabel" defaultChecked={isCompleted} onChange={handleCheckboxChange}/>
          <a onClick={(event) => {handleTopicClick(index, event);}}>
            {str}
          </a>
        </label>
      );
    });

    const handleTrackingbutton = async () => {
      const response = await trackCompletion(roadmapid);
      console.log('response:', response);

      if (response.status === 200) {
        setTracking(true);
      }
    }

    return (
        <>
          <div className='bodyroadmap'>
            <Navbar page={'navbardark'}/>
            <div className='roadmap'>

                {/* <getRoadmap query={query}/> */}

                <div className='onethird'>
                  <h1 className='heading'>ROADMAP ON</h1>
                  <div className='trackprogress'>
                    <h1 className='queryDisplay'>{query}</h1>
                    {!tracking ? 
                    <button className='trackprogressbutton' onClick={handleTrackingbutton}>Track progress</button> :
                    <p>tracking...</p>
                    }
                    
                  </div>

                  <div class='topicscard'>
                    {roadmaprender}
                  </div>

                  {/* <div className='feedback-container'> */}
                    <FeedbackBox query={query} queryid={roadmapid} initialfeedbackstate={true}/>
                  {/* </div> */}
                </div>

                {/* <div className='onethird'>
                  <h1>Questions</h1>
                </div> */}

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