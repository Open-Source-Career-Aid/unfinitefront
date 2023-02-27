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

const API_URL = "http://127.0.0.1:8000";

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
    const [roadmaprender, setRoadmaprender] = useState(null);

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
        setRoadmapid(data[0]);
        setRoadmap(data[1]);
        setTopicid(null);
      };
      getRoadmapData();
    }, [query]);

    useEffect(() => {

      if (topicid!==null && roadmapid!==null) {

        const getSearchresultsData = async () => {
          const data = await getSearchresults(roadmapid, topicid);
          setSearchresults(data);
        };
        getSearchresultsData();
      }
    }, [topicid]);

    // const response = fetch(API_URL + props.query)
    // const data = response.json()
    // const data = getRoadmap(query)
    // console.log(roadmap)
    
    // console.log("roadmap works")
    {// returns data in a list of items}

    const handleTopicClick = (index) => {
      setTopicid(index);
      console.log('topic', index, "roadmap", roadmapid);
    };

    const roadmaprender = roadmap.map((str, index) => (
      <a className='topics' key={str} onClick={() => handleTopicClick(index)}>
        {str}
      </a>
    ));

    // const searchresultsrender = searchresults.map((str, index) => (
    //   <a key={str}> {str} </a>
    // ));

    return (
        <>
            <Navbar page={'navbardark'}/>
            <div className='resultspage'>

                {/* <getRoadmap query={query}/> */}

                <div className='onethird'>
                  <h1>ROADMAP</h1>

                  <div class='topicscard'>
                    {roadmaprender}
                  </div>
                </div>

                {/* <div className='onethird'>
                  <h1>Questions</h1>
                </div> */}

                <div className='twothird'>
                  <h1>LEARNING RESOURCES</h1>

                  <div>
                    {searchresults.map(([link, title]) => (
                      <div className="searchcard" key={link}>
                        <a className='searchresults' href={link} target="_blank" rel="noopener noreferrer">
                          <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{link}</p>
                          </div>
                        </a>
                      </div>
                  
                    ))}
                  </div>
                </div>

            </div>
        </>

    )
}}

export default Roadmap;