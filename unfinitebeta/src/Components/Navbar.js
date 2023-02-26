import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import logout from "../Functions/userLogout";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        navigate('/login');
      };

    return (
        <nav className="navbar">
            <Link className="navbar-brand" to="/">
                Unfinite
            </Link>

            {/* <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
            </button> */}

            <div className="collapse navbar-collapse" id="navbarNav">

                <Link className="nav-link" onClick={handleLogout} to="/signup">
                Logout
                </Link>

            </div>
        </nav>
    );
    }

export default Navbar;