import React, { useEffect, useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from 'react-router-dom';

function SharedNotesComponent(props) {
  const context = useContext(NoteContext);        
  const { fetchSharedNotes, sharedNotes, deleteSharedNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      fetchSharedNotes();
    } else {
      navigate("/");
    }
  }, [fetchSharedNotes, navigate]);

  return (
    <div className="display-container">
        {sharedNotes.map((sharedNotes) => (
           <div key={sharedNotes._id} className="card custom-card m-2" style={{ width: '12rem', height: '15rem' }}>
            <div style={{marginLeft: "5rem", marginTop: "0.5rem"}} ><i className="fa-solid fa-trash mx-2" onClick={()=>{deleteSharedNote(sharedNotes._id);  props.showAlert("Note Deleted Successfully!", "success");}}  style={{ cursor: 'pointer', color: 'red',}}/></div>
            <h4 className="card-title mb-4 mx-2" style={{marginTop: "0.6rem"}}>{sharedNotes.Sharenote.title}</h4>
            <p className="card-text mb-4 mx-2">{sharedNotes.Sharenote.description}</p>
            <p style={{marginTop: "4rem"}} className="card-text mb-4 mx-2">From: {sharedNotes.sender_id.username}</p>
          </div>
        ))}
    </div>
  );
}

export default SharedNotesComponent;