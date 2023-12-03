import React, { useState } from 'react';
import "./Authenticate.css";
import logo from "./images/logo.png";
import { Link, useNavigate } from "react-router-dom";

function Signup(props) {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = credentials;
    const response = await fetch(
      `http://localhost:5000/api/auth/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("authtoken", json.authToken);
      navigate('/userui');
    }
    if (!json.success) {
      console.log('Errors:', json.errors);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section>
        <div className="authenticate-container">
          <img src={logo} alt="" />

          <h1 className="authenticate-head">Sign Up</h1>
          <hr className="line" />

          <form className="authenticate-form" onSubmit={handleSubmit}>

            <input type="text" id="username" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="email" id="email" name="email" placeholder="Email" autoComplete="username" onChange={handleChange} required />
            <input type="password" id="password" name="password" placeholder="Password" autoComplete="new-password" onChange={handleChange} required />
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" autoComplete="new-password" onChange={handleChange} required />

            <button type="submit" className="authenticate-btn">
              Sign Up
            </button>
            <span style={{ color: 'white' }}>Already have an account?</span>
            <Link to="../login" style={{ color: 'rgb(111, 215, 62)' }}>
              Login
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}

export default Signup;
