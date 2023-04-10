import React, { useState, useEffect } from "react";

function MobileCheck() {
  const [isMobile, setIsMobile] = useState(false);
  const bodySearch = document.querySelector('.bodysearchpage')
  const searchMessage = `<p style="color:#fff;text-align:center;"><strong>Please view this site on a desktop browser for the best user experience.</strong></p>`
  const homeMesage =    <p> <strong>Please view this site on a desktop browser for the best user experience. </strong></p>
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
  }, []);

  return (
    <div>
      {isMobile && (
        ((bodySearch) ? (bodySearch.innerHTML = searchMessage) : homeMesage)
      )}
    </div>
  );
}

export default MobileCheck;
