import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import logout from "../Functions/userLogout";
import { useNavigate } from "react-router-dom";

const Navbar = ({page}) => {

    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        navigate('/login');
      };

    return (
        <nav className={page}>
            <Link className="navbar-brand" to="/search">
                UNFINITE<span className="beta-symbol"> &beta;</span>
            </Link>

            {/* <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
            </button> */}

            <Link className="nav-link" onClick={handleLogout} to="/signup">
            Logout
            </Link>
        </nav>
    );
    }

export default Navbar;