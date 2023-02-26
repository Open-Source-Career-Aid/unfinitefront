import React from 'react';

function SearchResultCards({ searchResults }) {
  return (
    <div>
      {searchResults.map(([link, title]) => (
        <div className="card" key={link}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{link}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default SearchResultCards;