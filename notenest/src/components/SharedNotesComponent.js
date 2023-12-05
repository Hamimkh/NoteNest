import React, { useEffect, useContext } from 'react';
import NoteState from '../context/notes/NoteContext';
import SharedNoteItem from './SharedNoteItem';
import { useNavigate } from 'react-router-dom';

function SharedNotesComponent() {
  const { fetchSharedNotes, sharedNotes } = useContext(NoteState);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      fetchSharedNotes();
    } else {
      navigate("/");
    }
  }, [fetchSharedNotes, navigate]);

  return (
    <div>
      {sharedNotes.map((sharedNote) => (
        <SharedNoteItem key={sharedNote._id} sharedNote={sharedNote} />
      ))}
    </div>
  );
}

export default SharedNotesComponent;
