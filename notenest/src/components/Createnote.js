import React, { useContext, useState } from "react";
import Notecontext from "../context/notes/NoteContext";

function Createnote(props) {
  const context = useContext(Notecontext);
  const { addNote } = context;

  const [note, setNote] = useState({title: "", description: ""});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description);
    setNote({title: "", description: "",});
    props.showAlert("Note Added Successfully!", "success");
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div id="notes-container">
            <div className="card custom-card m-2" style={{width: "12rem", height: "15rem"}} data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div className="card-body custom-card-body">
                    <i className="fa-solid fa-notes-medical"
                    style={{fontSize: "2rem", marginTop:"4rem", marginLeft: "3.5rem", marginBottom: "1rem", color: "green"}}></i>
                    <span style={{textAlign: "center", fonWeight: "700"}}>Create New Note</span>
                </div>
            </div>
        </div>  

        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Create New Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}> 
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" id="text" name="title" value={note.title} className="form-control"  onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea type="text" id="description" name="description" value={note.description} className="form-control" onChange={handleChange}  rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Add note</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Createnote
