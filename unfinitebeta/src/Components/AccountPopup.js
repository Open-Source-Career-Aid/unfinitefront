import React, { useState, useRef, useEffect } from "react";
import "../css/AccountPopup.css";
import logout from "../Functions/userLogout";
import { useNavigate } from "react-router-dom";

function AccountPopup({ toggleboolean }) {

  const navigate = useNavigate();

  const accountPopupRef = useRef(null);

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate('/login');
  };

  const handleAccount = (event) => {
    event.preventDefault();
    navigate('/tracking');
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
      {toggleboolean && (
        <div className="account-popup-overlay">
          <div className="account-popup-box" ref={accountPopupRef}>
            <button className="account-btn" onClick={handleAccount}>Account</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountPopup;
