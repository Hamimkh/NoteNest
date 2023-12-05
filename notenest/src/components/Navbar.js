import React from 'react'
import logo from "./images/logo.png"
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem("authtoken");
    navigate("/")
  }
  const toggleMenu = () => {
    const navLinks = document.getElementById("navLinks");
    const menuIcon = document.getElementById("menuIcon");
    if (navLinks && menuIcon) {
      navLinks.classList.toggle("open");
      menuIcon.classList.toggle("closed");
    }
  };

  return (
    <>
      <header>
        <nav>
            <div id="navbar" className="navbar">
                <div id="logo" className="logo"><img src={logo} alt="NOTENEST"/></div>

                <div id="menuIcon" className="menu-icon" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                    {!localStorage.getItem("authtoken")?
                <ul id="navLinks" className="nav-links mb-1">
                    <span id="closeIcon" className="close-icon" onClick={toggleMenu}>&times;</span>
                    <li className="items"><Link to="/signup" className='custom-btn mx-2'>Signup</Link></li>
                    <li className="items"><Link to="/login" className='custom-btn mx-3'>Login</Link></li>  </ul> : <ul id="navLinks" className="nav-links mb-1">
                    <span id="closeIcon" className="close-icon" onClick={toggleMenu}>&times;</span>
                    <li className="items"><Link to="/receivednotes" onClick={handleLogout} className='custom-btn mx-2'>Received notes</Link></li>
                    <li className="items"><Link onClick={handleLogout} className='custom-btn mx-2'>Logout</Link></li>
                    </ul>}
               
            </div>
        </nav>
    </header>
    </>
  )
}

export default Navbar
