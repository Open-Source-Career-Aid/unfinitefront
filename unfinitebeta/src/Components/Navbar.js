import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link className="navbar-brand" to="/">
                Unfinite
            </Link>

            {/* <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
            </button> */}

            <div className="collapse navbar-collapse" id="navbarNav">

                <Link className="nav-link" to="/login">
                Login
                </Link>
                
                <Link className="nav-link" to="/signup">
                Signup
                </Link>

            </div>
        </nav>
    );
    }

export default Navbar;