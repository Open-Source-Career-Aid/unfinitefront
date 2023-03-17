import React, { useState , useEffect } from 'react';
import Roadmap from '../Components/Roadmap';
import '../css/SearchPage.css';
import isAuthenticated from '../Functions/isAuthenticated';
import { useNavigate } from "react-router-dom";
import getCSRF from "../Functions/getCSRF";
import logout from '../Functions/userLogout';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
ReactGA.initialize('G-8YXPLS55QD');

function SearchBar(props) {

  const [userstatus , setUserstatus] = useState(null);
  // const [userlocation, setUserlocation] = useState('landing');
  // const [searchTerm, setSearchTerm] = useState('');
  // const [showroadmap, setShowroadmap] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {

    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setUserstatus(authenticated);
      if (!authenticated) {
        navigate('/login');
      }
    };

    checkAuth();

  }, []);  

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/results?query=${query}`);
  };


  return (
      <div className='bodysearchpage'>
        <div className='SearchPage'>
            <Navbar page={'navbarsearchpage'}/>
            <div className='SearchPageContent'>
              <h1 className='logocenter'>UNFINITE <span className="beta-symbol">&beta;</span></h1>
              <div className='topsearchcontainer'>
                <form onSubmit={handleSubmit}>
                    <div className='searchbarcontainer'>
                        <input type="text" className='searchbar' placeholder="What would you explore today?" value={query} onChange={handleInputChange} />
                        <button className='searchbutton' type="submit">button</button>
                        {/* <button type="submit"><Link to={{ pathname: '/results', search: `?query=${query}` }}>Search</Link></button> */}
                    </div>
                </form>
              </div>
              <div className='example-searches'>
                <a className='example-search' href='/results?query=backend%20web-development%20with%20python'>backend web-development with python</a>
                <a className='example-search' href='/results?query=chaos%20theory'>chaos theory</a>
                <a className='example-search' href='/results?query=elements%20of%20an%20entrepreneurial%20ecosystem'>elements of an entrepreneurial ecosystem</a>
              </div>
            </div>
        </div>

      </div>
  );
}

export default SearchBar;
