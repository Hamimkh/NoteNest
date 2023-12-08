import React, { useEffect, useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from 'react-router-dom';

function SharedNotesComponent() {
  const context = useContext(NoteContext);        
  const { fetchSharedNotes, sharedNotes} = context;
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
            <h4 className="card-title mb-4 mx-2">{sharedNotes.Sharenote.title}</h4>
            <p className="card-text mb-4 mx-2">{sharedNotes.Sharenote.description}</p>
            <p className="card-text mb-4 mx-2">From: {sharedNotes.sender_username}</p>
          </div>
        ))}
    </div>
  );
}

export default SharedNotesComponent;