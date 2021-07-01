import React from 'react';
import  {Navbar}  from 'react-bootstrap';

const Footer = (props)=>{
return (
    <>
     <Navbar bg="primary" variant="dark">
        <Navbar.Brand className="footer" >&copy; ToDo 2021</Navbar.Brand>
     </Navbar>
    </>
  );
}


export default Footer;