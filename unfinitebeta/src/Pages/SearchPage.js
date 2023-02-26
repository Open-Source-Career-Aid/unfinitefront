import React, { useState , useEffect } from 'react';
import Roadmap from '../Components/Roadmap';
import '../css/SearchPage.css';
import isAuthenticated from '../Functions/isAuthenticated';
import { useNavigate } from "react-router-dom";
import getCSRF from "../Functions/getCSRF";
import logout from '../Functions/userLogout';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';

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

    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setUserstatus(authenticated);
      if (!authenticated) {
        navigate('/login');
      }
    };

    checkAuth();

  }, []);  

  return (
    <div>
      <Navbar />
        <div className='container'>
          <h1>UNFINITE <span className="beta-symbol">&beta;</span></h1>
            <form>
                <div className='searchbarcontainer'>
                    <input type="text" className='searchbar' placeholder="What would you explore today?" value={query} onChange={handleInputChange} />
                    <button type="submit"><Link to={{ pathname: '/results', search: `?query=${query}` }}>Search</Link></button>
                </div>
            </form>
        </div>

    </div>
  );
}

export default SearchBar;
