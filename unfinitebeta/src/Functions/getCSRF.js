import React from "react";

async function getCSRF() {

    let _csrfToken = null;

    async function getCsrfToken() {
        if (_csrfToken === null) {
          const response = await fetch(`http://localhost:8000/api/csrf_cookie/`, {
            credentials: 'include',
          });
          const data = await response.json();
          _csrfToken = data.csrfToken;
        }
        return _csrfToken;
      }

    await getCsrfToken().then((csrfToken) => {
        //console.log(document.cookie);
        // localStorage.setItem('csrfToken', csrfToken);
        document.cookie = `csrftoken=${csrfToken}`;
    }, []);
    return null;

}

export default getCSRF;