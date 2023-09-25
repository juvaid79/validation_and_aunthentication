import React from 'react';
import './User.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logoImage from '../User/logo.png';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserNavbar() {
  const navigate = useNavigate()
  const UserLogout = () => {
    localStorage.clear()
    navigate('/userlogin')
    toast.success('You are LogOut Please Login Again')
  }
  return (
    <>
      <Navbar expand="lg" className="navbar-custom">
        <div className="logo-container">
          <Navbar.Brand href="/userhome"> <img src={logoImage} alt="Your Logo" /></Navbar.Brand>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/userhome" className="nav-link">Home</Nav.Link>
            <Nav.Link href="/adduser" className="nav-link">Add User</Nav.Link>
            <Nav.Link href="services" className="nav-link">Services</Nav.Link>
            <Nav.Link href="contact" className="nav-link">Contact</Nav.Link>
            <Button variant="danger" size="xs" onClick={UserLogout}>LogOut</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default UserNavbar;
