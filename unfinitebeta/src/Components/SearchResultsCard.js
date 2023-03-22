import React from 'react';

function SearchResultCard({ link , title , index , handleLikeDislike }) {
  return (
    <div>
        <div className="searchcard" key={link}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <div className='search-card-content'>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{link}</p>
              </div>
              <div className='like-dislike-container'>
                <label className="like-icon">
                  <input type="radio" name={`like-dislike-${index}`} value='like' onClick={(event) => handleLikeDislike(event, index)}/>
                  {/* <span className="like-icon"></span> */}
                </label>
                <label className="dislike-icon">
                  <input type="radio" name={`like-dislike-${index}`} value='dislike' onClick={(event) => handleLikeDislike(event, index)}/>
                  {/* <span></span> */}
                </label>
              </div>
            </div>
          </a>
        </div>
    </div>
  );
}

export default SearchResultCard;