import React from 'react';
import logo from './images/logo.png';
import './Authenticate.css';

function Login() {
  return (
    <>
      <section>
        <div className="authenticate-container" style={{ height: '28rem' }}>
          <img src={logo} alt="" />

          <h1 className="authenticate-head">Log In</h1>
          <hr className="line" />

          <form className="authenticate-form" action="#" method="POST" id="loginForm">
            <input type="email" id="email" name="email" placeholder="Email" required />
            <input type="password" id="password" name="password" placeholder="Password" required />
            <button type="submit" className="authenticate-btn">
              Login
            </button>
            <span style={{ color: 'white' }}>Don't have an account?</span>
            <a href="./signup.html" style={{ color: 'rgb(111, 215, 62)' }}>
              Signup
            </a>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
