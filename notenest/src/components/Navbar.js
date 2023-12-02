import React from 'react'
import logo from "./images/logo.png"
import "./Navbar.css"
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header>
        <nav>
            <div id="navbar" className="navbar">
                <div id="logo" className="logo"><img src={logo} alt="NOTENEST"/></div>

                <div id="menuIcon" className="menu-icon">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <ul id="navLinks" className="nav-links mb-1">
                    <span id="closeIcon" className="close-icon">&times;</span>
                    <li className="items"><Link to="/signup" className='custom-btn mx-2'>Signup</Link></li>
                    <li className="items"><Link to="/login" className='custom-btn mx-3'>Login</Link></li>
                </ul>
            </div>
        </nav>
    </header>
    </>
  )
}

export default Navbar
