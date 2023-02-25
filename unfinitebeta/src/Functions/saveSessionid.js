import React from "react";

function saveSessionId() {
    const sessionId = getCookie('sessionid');
    // console.log(sessionId);
    if (sessionId) {
      localStorage.setItem('sessionId', sessionId);
    }
  }
  
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

export default saveSessionId;