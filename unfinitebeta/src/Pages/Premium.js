import React from 'react';
import { useNavigate } from "react-router-dom";
function Premium() {

    //navigate initialize
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
      };

    return (
        <>
        <div className="premium">
            <div className="headerpdfsearch">
            <div className="logocontainer">
                <h1 className="logopdfsearch">unfinite</h1>
                <div>
                    <button className="headerbutton" onClick={handleClick}>
                    load another pdf
                    </button>
                </div>
            </div>
            <h1>Premium</h1>
            </div>
        </div>
        </>
    )
}

export default Premium;