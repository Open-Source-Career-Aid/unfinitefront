import React from 'react';
import SearchResultCard from './SearchResultsCard';

const SearchRender = ({ searchResults, handleLikeDislike }) => {
  return (
    <div>
      {searchResults.map(([link, title], index) => (
        <SearchResultCard link={link} title={title} index={index} handleLikeDislike={handleLikeDislike} />
      ))}
    </div>
  );
};

export default SearchRender;