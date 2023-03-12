import React, { useState, useRef, useEffect } from "react";
import "../css/AccountPopup.css";

function AccountPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const accountPopupRef = useRef(null);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (accountPopupRef.current && !accountPopupRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [accountPopupRef]);

  return (
    <div className="account-popup">
      <div className="account-icon" onClick={toggleBox}></div>
      {isOpen && (
        <div className="account-popup-overlay">
          <div className="account-popup-box" ref={accountPopupRef}>
            <button className="account-btn">Account</button>
            <button className="logout-btn">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountPopup;
