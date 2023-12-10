import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import NoteState from './context/notes/Notestate';
import Alert from './components/Alert';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Userui from './components/Userui';
import SharedNotesComponent from './components/SharedNotesComponent';

function App(props) {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type}
    );
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <NoteState>
    <Router>
      <Navbar/>
        {alert && <Alert alert={alert}/>}
      <Routes>
        <Route exact path="/" element={ <Home/> }/>
        <Route exact path="/userui" element={ <Userui showAlert={showAlert}/> }/>
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
        <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="/receivednotes" element={ <SharedNotesComponent showAlert={showAlert}/> }/>
      </Routes>
    </Router>
    </NoteState>
  );
}

export default App;