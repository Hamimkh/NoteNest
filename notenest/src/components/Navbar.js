import React from 'react'
import logo from "./images/logo.png"
import "./Navbar.css"

function Navbar() {
  return (
    <>
      <header>
        <nav>
            <div id="navbar" class="navbar">
                <div id="logo" class="logo"><img src={logo} alt="NOTENEST"/></div>

                <div id="menuIcon" class="menu-icon">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
                <ul id="navLinks" class="nav-links mb-1">
                    <span id="closeIcon" class="close-icon">&times;</span>
                    <li class="items"><a href="../pages/signup.html" class='custom-btn mx-2'>Signup</a></li>
                    <li class="items"><a href="../pages/login.html" class='custom-btn mx-3'>Login</a></li>
                </ul>
            </div>
        </nav>
    </header>
    </>
  )
}

export default Navbar
