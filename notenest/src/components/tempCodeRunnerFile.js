import React from 'react'

function signup() {
  return (
    <>
    <div className="authenticate-container">
        <img src="./images/signup-bg.jpg" alt=""/>

        <h1 className="authenticate-head">Sign Up</h1>
        <hr className="line"/>

        <form className="authenticate-form" action="#" method="POST" id="signupForm">

            <input type="text" id="username" name="username" placeholder="Username"  required>
            <input type="email" id="email" name="email" placeholder="Email" autocomplete="username" required>
            <input type="password" id="password" name="password" placeholder="Password" autocomplete="new-password" required>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" autocomplete="new-password" required>

            <button type="button" className="authenticate-btn" onclick="signup()">Sign Up</button>
            <span style="color: white;"> 
                Already have an account?
            </span>
            <a href="./login.html" style="color: rgb(111, 215, 62);">Login</a>
        </form>
    </div>
    </>
  )
}

export default signup
