import React ,{useState} from 'react';
import logo from './images/logo.png';
import './Authenticate.css';
import { Link, useNavigate } from "react-router-dom";


function Login() {
  const [credintials, setCredintials] = useState({email:"", password:""});
  let navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: credintials.email, password: credintials.password}),
      }
    );
    const json = await response.json();
    console.log(json)
    if(json.success){
      // Save the auth token and redirect
      localStorage.setItem('authtoken', json.authToken);
      navigate('/userui');

    }
  }
  const handleChange = (e) => {
    setCredintials({ ...credintials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <section>
        <div className="authenticate-container" style={{ height: '28rem' }}>
          <img src={logo} alt="" />

          <h1 className="authenticate-head">Log In</h1>
          <hr className="line" />

          <form className="authenticate-form" onSubmit={handleSubmit}>
            <input type="email" id="email" name="email"  onChange={handleChange} placeholder="Email" required />
            <input type="password" id="password" name="password" current-password="autocomplete" onChange={handleChange} placeholder="Password" required />
            <button type="submit" className="authenticate-btn">
              Login
            </button>
            <span style={{ color: 'white' }}>Don't have an account?</span>
            <Link to="../signup" style={{ color: 'rgb(111, 215, 62)' }}>
              Signup
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
