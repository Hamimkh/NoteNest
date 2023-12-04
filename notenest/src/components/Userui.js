import React, { useContext, useEffect, useState, useRef } from "react";
import Createnote from "./Createnote";
import Noteitems from "./Noteitems";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

function Userui() {
    const context = useContext(NoteContext);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "" });
    const { notes, getNotes, editNote } = context;
    const navigate = useNavigate();
    const ref = useRef(null);
    const refClose = useRef(null);
  
    useEffect(() => {
      if (localStorage.getItem("authtoken")) {
        getNotes();
      } else {
        navigate("/");
      }
    }, [getNotes, navigate]);
  
    const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click(); 
      };
      const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
      };

  return (
    <div className="display-container">
      <Createnote />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal">
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>
              <button
                ref={refClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="etitle"
                    name="etitle"
                    className="form-control"
                    value={note.etitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    rows="3"
                    value={note.edescription}
                    onChange={handleChange}></textarea>
                </div>
                <button
                  type="submit"
                  id="saveEditNoteBtn"
                  className="btn btn-success">
                  Update note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {notes.map((note) => {
        return <Noteitems key={note._id} updateNote={updateNote} note={note} />;
      })}
    </div>
  );
}

export default Userui;
