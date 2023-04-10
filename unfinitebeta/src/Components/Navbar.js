import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useNavigate } from "react-router-dom";
import AccountPopup from "./AccountPopup";

const Navbar = ({page}) => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleBox = () => {
        setIsOpen(!isOpen);
      };

    return (
        <>
            <nav className={page}>
                <Link className="navbar-brand" to="/oldapp">
                    UNFINITE<span className="beta-symbol"> &beta;</span>
                </Link>

                {/* <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button> */}

                <div className="navbar-profilecircle" onClick={toggleBox}></div>

                {/* <div>
                    <Link className="nav-link" to="/tracking">
                        Track your learning
                    </Link>
                    <Link className="nav-link" onClick={handleLogout} to="/signup">
                        Logout
                    </Link>
                </div>  */}
            </nav>
            <AccountPopup toggleboolean={isOpen} />
        </>
    );
    }

export default Navbar;