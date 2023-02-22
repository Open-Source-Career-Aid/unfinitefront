import React from 'react';

const API_HOST = 'http://localhost:8000';

let _csrfToken = null;

async function getCsrfToken() {
    if (_csrfToken === null) {
      const response = await fetch(`${API_HOST}/api/csrf_cookie`, {
        credentials: 'include',
      });
      const data = await response.json();
      _csrfToken = data.csrfToken;
    }
    return _csrfToken;}

const Test = () => {


  return (
    <div>
      <p>{_csrfToken}</p>
    </div>
  );
}

export default Test;
