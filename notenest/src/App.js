import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <>
      <Router>
      <Navbar/>
      <div className="container">
        <Routes> 
          <Route  exact path="/signup" element={<Signup/>} />
          <Route  exact path="/signup" element={<Login/>} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
