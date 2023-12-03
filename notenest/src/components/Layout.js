import React from 'react';
import Navbar from './Navbar';
import Home from './Home';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Home />
      {children}
    </>
  );
}

export default Layout;
