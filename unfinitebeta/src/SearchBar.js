import React, { useState } from 'react';
import Roadmap from './Roadmap';
import './SearchBar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showroadmap, setShowroadmap] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    {searchTerm ? setShowroadmap(true): setShowroadmap(false)};
    console.log(searchTerm);
    };

  return (
    <div className='container'>
        <h1>Unfinite Beta</h1>
        <form>
            <div>
                <input
                    type="text"
                    placeholder="Let's learn something new..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button type="submit" onClick={handleFormSubmit}>Search</button>
            </div>
        </form>
        {showroadmap ? <Roadmap query={searchTerm}/>: null}
    </div>
  );
}

export default SearchBar;
