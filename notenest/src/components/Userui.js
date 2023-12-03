import React,{useContext} from 'react'
import Createnote from './Createnote'
import Noteitems from './Noteitems'
import NoteContext from '../context/notes/NoteContext'

function Userui() {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;
  return (
    <>
      <Createnote/>
      {
        (notes.map((note)=>{
            return <Noteitems note={note} />
        }))
      }
      
    </>
  )
}

export default Userui
