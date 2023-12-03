import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("authtoken")
      }
    });
    const json = await response.json() 
    setNotes(json)
  }

  // Add a Note
const addNote = async (title, description) => {
  // API Call 
  const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem("authtoken")
    },
    body: JSON.stringify({ title, description})
  });

  const note = await response.json();

  // Update the state correctly
  setNotes((prevNotes) => {
    return [...prevNotes, note];
  });
}

// Edit a Note
const editNote = async (id, title, description) => {
    // API Call 
    const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("authtoken")
      },
      body: JSON.stringify({title, description})
    });
    const json = await response.json(); 
    console.log(json)

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break; 
      }
    }  
    setNotes(newNotes);
  }

return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;