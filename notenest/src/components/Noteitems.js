import React from 'react'

function Noteitems() {
  return (
    <>
      <div id="notes-container">
          <div  className="card custom-card m-2" style={{ width: '12rem', height: '15rem' }}>
          <i className="fa-solid fa-edit mx-2" style={{fontSize: "1rem", margin: "1rem", color: "green"}}></i>
          <i className="fa-solid fa-trash mx-2" style={{fontSize: "1rem", margin: "1rem", color: "green"}}></i>
          <i className="fa-solid fa-share mx-2" style={{fontSize: "1rem", margin: "1rem", color: "green"}}></i>
            <h4 className="card-title mb-4"></h4>
            <p className="card-text mb-4"></p>
          </div>
      </div>
    </>
  )
}

export default Noteitems
