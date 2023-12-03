import React from 'react'

function Createnote() {
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
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Add note</button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Createnote
