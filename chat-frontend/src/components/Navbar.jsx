import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../App.css'

const MyNavbar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav style={{marginRight: 10}}><Link className='text-white' to='/'>Home</Link></Nav>
            <Nav style={{marginRight: 10}}><Link className='text-white' to='/features'>Features</Link></Nav>
            <Nav style={{marginRight: 10}}><Link className='text-white' to='/about'>About</Link></Nav>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default MyNavbar