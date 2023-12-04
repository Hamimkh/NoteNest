import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

function Noteitems(props) {
    const context = useContext(NoteContext)
    const {deleteNote} = context;
    const { note, updateNote } = props;

    const handleShareNote = () => {
      const email = prompt('Enter the email to share the note with:');
      if (email) {
        context.shareNote(note._id, email);
        console.log("Note shared successfully!")
      }
    };

  return (
    <>
      <div id="notes-container">
          <div  className="card custom-card m-2" style={{ width: '12rem', height: '15rem' }}>
            <div className='card-icon'>
          <i className="fa-solid fa-edit mx-2" onClick={()=>{updateNote(note)}} style={{fontSize: "1rem", marginLeft: "1rem", color: "green", width:"2rem", cursor:"pointer"}} ></i>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}} style={{fontSize: "1rem", marginLeft: "1rem", color: "green", width:"2rem", cursor:"pointer"}}></i>
          <i className="fa-solid fa-share mx-2"  onClick={handleShareNote} style={{fontSize: "1rem", marginLeft: "1rem", color: "green", width:"2rem", cursor:"pointer"}}></i>
          </div>
            <h4 className="card-title mb-4 mx-2">{note.title}</h4>
            <p className="card-text mb-4 mx-2">{note.description}</p>
          </div>
      </div>
    </>
  )
}

export default Noteitems
