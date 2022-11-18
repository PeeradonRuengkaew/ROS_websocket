import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


class Header extends Component{
  render(){
    return( 
      <Container>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Navbar.Brand href="#home">React ROS Robot</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">about</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar> 
      </Container>
     );
}

}

export default Header;


