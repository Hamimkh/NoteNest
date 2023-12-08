import React from 'react'
import Navbar from './Navbar'
import SharedNotesComponent from './SharedNotesComponent'


function ReceivedNotes({ children }) {
  return (
    <div>
      <Navbar/>
      <SharedNotesComponent/>
      {children}
    </div>
  )
}

export default ReceivedNotes
