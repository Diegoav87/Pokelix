import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  
    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Link to="/"><Navbar.Brand href="#home">Pokelix</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {/* <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
            </Navbar.Collapse> */}
        </Navbar>
      );
}

export default Navigation;