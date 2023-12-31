import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [sharedNotes, setSharedNotes] = useState([]);

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

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("authtoken")
      }
    });
    const json = await response.json();
    console.log(json) 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Share note
  const shareNote = async (id, email) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/sharenote/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authtoken'),
          },
          body: JSON.stringify({ email }),
        }
      );
      const json = await response.json();
      console.log(json);
      // Handle success or error as needed
    } catch (error) {
      console.error('Error sharing note:', error);
      // Handle error
    }
  };

  // Fetch shared notes
  const fetchSharedNotes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/fetchsharednotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("authtoken")
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch shared notes. Status: ${response.status}`);
      }
  
      const json = await response.json();
      setSharedNotes(json);
    } catch (error) {
      console.error('Error fetching shared notes:', error.message);
      // Handle error, e.g., show a user-friendly error message
    }
  }

  // Delete a Shared Note
  const deleteSharedNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/deletesharednote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("authtoken")
        }
      });

      const json = await response.json();
      console.log(json);

      // Update sharedNotes state after successful deletion
      setSharedNotes((prevSharedNotes) => prevSharedNotes.filter((sharedNote) => sharedNote._id !== id));
    } catch (error) {
      console.error('Error deleting shared note:', error);
      // Handle error
    }
  };



return (
    <NoteContext.Provider value={{notes,getNotes,addNote,editNote,deleteNote,shareNote,fetchSharedNotes,setSharedNotes,sharedNotes,deleteSharedNote}}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;