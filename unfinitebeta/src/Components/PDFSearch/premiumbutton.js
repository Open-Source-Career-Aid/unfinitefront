import React from "react";
import "../../css/PDFSearch.css";
import { useNavigate } from "react-router-dom";

const PremiumButton = () => {

    const navigate = useNavigate();

    return (
            <div className="headerbutton" style={{backgroundColor: "#ffd500", color: "#000000"}} onClick={()=>navigate('/premium')}>
                <a href="/premium">Premium</a>
            </div>
    );
}

export default PremiumButton;