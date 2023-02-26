import React from "react";

function getCSRF() {

    let _csrfToken = null;

    async function getCsrfToken() {
        if (_csrfToken === null) {
          const response = await fetch(`http://localhost:8000/api/csrf_cookie`, {
            credentials: 'include',
          });
          const data = await response.json();
          _csrfToken = data.csrfToken;
        }
        return _csrfToken;
      }

    getCsrfToken().then((csrfToken) => {
        // console.log(csrfToken);
        // localStorage.setItem('csrfToken', csrfToken);
        document.cookie = `csrftoken=${csrfToken}`;
    }, []);
    return null;

}

export default getCSRF;