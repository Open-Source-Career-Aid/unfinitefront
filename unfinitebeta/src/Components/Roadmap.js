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
import Loading from './Loading';
import { API_URL } from '../API_URL';


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
    const [loading, setLoading] = useState(false);
    const [tracking, setTracking] = useState(false);
    const [twothirdHeight, setTwothirdHeight] = useState('100vh');
    const [serpindex, setSerpindex] = useState(null);

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

      if (searchresults.length !== 0) {
        setTwothirdHeight('100%');
      } else {
        setTwothirdHeight('100vh');
      }
    }, [searchresults]);

    useEffect(() => {

      const getRoadmapData = async () => {
        const data = await getRoadmap(query);
        const completionresponse = await getTopicCompletion({queryid: data[0]});
        setRoadmapid(data[0]);
        setRoadmap(data[1]);
        setTopicid(null);
        setCompletion(JSON.parse(completionresponse));
      };
      getRoadmapData();
    }, [query]);

    useEffect(() => {

      setSearchresults([]);

      if (topicid!==null && roadmapid!==null) {

        const getSearchresultsData = async () => {
          const data = await getSearchresults(roadmapid, topicid);
          setSearchresults(data);
        };
        getSearchresultsData();
      }
    }, [topicid]);

    useEffect(() => {

      if (searchresults.length!==0) {
        setLoading(false);
      }
    }, [searchresults]);

    // const response = fetch(API_URL + props.query)
    // const data = response.json()
    // const data = getRoadmap(query)
    // console.log(roadmap)
    
    // console.log("roadmap works")
    {// returns data in a list of items}

    const handleTopicClick = (index, event) => {
      event.preventDefault();
      setTopicid(index);
      setLoading(true);
      console.log('topic', index, "roadmap", roadmapid);
    };

    useEffect(() => {

      if (serpindex!==null && thumbs!==null) {

        const queryid = roadmapid;
        const topicindex = topicid;
        console.log('serpindex:', serpindex, 'thumbs:', thumbs);
        const response = sendFeedbackSerp({queryid, topicindex, serpindex, thumbs});
        console.log('response:', response);
        setSerpindex(null);
        setThumbs(null);

      }

    }, [serpindex, thumbs]);


    const handleLikeDislike = async (event, index) => {
      const value = event.target.value;

      if (value === 'like') {
        setThumbs(1);
        setSerpindex(index);
        console.log('thumbs:', thumbs);
      } else {
        setThumbs(0);
        setSerpindex(index);
        console.log('thumbs:', thumbs);
      }

    };

    // const roadmaprender = roadmap.map((str, index) => (
    
    //   // radio button
    //   <label key={str} className='topics'>
    //      <input type="checkbox" name="topicLabel" value="no" />
    //       <a onClick={(event) => 
    //         {handleTopicClick(index, event);}}>
    //         {str}
    //       </a>
    //    </label>
    // ));

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

    const searchrender = searchresults.map(([link, title], index) => {
    
      return (
        <div className="searchcard" key={link}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <div className="search-card-content">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{link}</p>
              </div>
              <div className="like-dislike-container">
                <label className="like-icon">
                  <input
                    type="radio"
                    name={`like-dislike-${index}`}
                    value="like"
                    onChange={(event) => {
						handleLikeDislike(event, index);
					}}
                  />
                  {/* <span className="like-icon"></span> */}
                </label>
                <label className="dislike-icon">
                  <input
                    type="radio"
                    name={`like-dislike-${index}`}
                    value="dislike"
                    onChange={(event) => {
						handleLikeDislike(event, index);
					}}
                  />
                  {/* <span></span> */}
                </label>
              </div>
            </div>
          </a>
        </div>
      );
    });

    const handleTrackingbutton = async () => {
      setTracking(true);
    }
    
    // const searchresultsrender = searchresults.map((str, index) => (
    //   <a key={str}> {str} </a>
    // ));

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
                  <h1 className='heading'>LEARNING RESOURCES</h1>

                  <div className='searchresults'>
                    {loading ? <Loading /> : null}
                    {searchrender}
                  </div>

                </div>

            </div>
            </div>
        </>

    )
}}

export default Roadmap;