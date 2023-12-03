import React from 'react'

function Noteitems(props) {
    const { note } = props;

  return (
    <>
      <div id="notes-container">
          <div  className="card custom-card m-2" style={{ width: '12rem', height: '15rem' }}>
            <div className='card-icon'>
          <i className="fa-solid fa-edit mx-2" style={{fontSize: "1rem", marginLeft: "1rem", color: "green", width:"2rem", cursor:"pointer"}}></i>
          <i className="fa-solid fa-trash mx-2" style={{fontSize: "1rem", marginLeft: "1rem", color: "green", width:"2rem", cursor:"pointer"}}></i>
          <i className="fa-solid fa-share mx-2" style={{fontSize: "1rem", marginLeft: "1rem", color: "green", width:"2rem", cursor:"pointer"}}></i>
          </div>
            <h4 className="card-title mb-4 mx-2">{note.title}</h4>
            <p className="card-text mb-4 mx-2">{note.description}</p>
          </div>
      </div>
    </>
  )
}

export default Noteitems
