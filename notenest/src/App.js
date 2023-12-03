// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Signup from './components/Signup';
import Login from './components/Login';
import Userlayout from './components/Userlayout';
import NoteState from './context/notes/Notestate';

function App() {
  return (
    <NoteState>
    <Router>
      <Routes>
        <Route exact path="/" element={ <Layout />}/>
        <Route exact path="/userui" element={ <Userlayout/>}/>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
    </NoteState>
  );
}

export default App;
