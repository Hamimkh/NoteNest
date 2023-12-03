import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css"


function Home() {
  return (
    <>
        <div className="container mt-5">
          <h1 className="container-title">Welcome to NOTENEST</h1>
          <p className="container-para">Your go-to platform for organizing and managing your notes seamlessly. Whether
            it's jotting down ideas,</p>
          <p className="container-para">track of tasks, or sharing notes with others, NoteNest has you covered.</p>
          <p className="container-para">Get started today by signing up and experience a new way of managing your notes
            effortlessly.</p>
          <Link to="/signup" className="container-btn" >Sign up for free</Link>
          <span>
            Already have an account?
            <Link to="/login" style={{ color: 'rgb(111, 215, 62)' }}>Login</Link>
          </span>
        </div>

        <div className="lower-container mt-5">
          <h2 className="lower-container-title">How it Works</h2>
          <p className="lower-container-para">Follow these simple steps to make the most of NoteNest:</p>
          <ol>
            <li>Sign up for a NoteNest account.</li>
            <li>Create and manage your notes.</li>
            <li>Share notes with friends or colleagues.</li>
            <li>Stay organized and boost your productivity!</li>
          </ol>
        </div>
      <hr />

      <footer style={{ margin: '1rem' }}>&copy; 2023 Notenest by Shamim Hossain. All rights reserved.</footer>
    </>
  );
}

export default Home;
