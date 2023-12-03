import React from 'react'
import Navbar from './Navbar'
import Userui from './Userui'
import { children } from 'react'

function Userlayout() {
  return (
    <>
      <Navbar/>
      <Userui/>
      {children}
    </>
  )
}

export default Userlayout
