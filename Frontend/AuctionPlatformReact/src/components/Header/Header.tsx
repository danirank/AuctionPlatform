import PrimaryButton from "../Buttons/PrimaryButton";
import { NavLink as RouterNavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";
import {authService} from "../../services/AuthService/AuthService";




function Header() {

const [loggedIn, setLoggedIn] = useState(false);

useEffect(() => {
  const sync = async () => setLoggedIn(await authService.isLoggedIn());

  sync();
  return authService.onAuthChange(sync);
}, []);


  return (
    
    
    <Navbar expand="md" bg="dark" variant="dark" className="px-3">
      <Container fluid>
        {/* Brand syns alltid */}
        <Navbar.Brand as={RouterNavLink} to="/">
          MyAuctionPlatform
        </Navbar.Brand>

        {/* Hamburger */}
        <Navbar.Toggle aria-controls="main-nav" />

        {/* Endast navlinks inuti collapse */}
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={RouterNavLink} to="/" end>
              Hem
            </Nav.Link>
            <Nav.Link as={RouterNavLink} to="/register">
              Registrera
            </Nav.Link>
           
          </Nav>
        </Navbar.Collapse>

        {/* Logga in syns alltid (utanför collapse) */}
        <Nav>
          <Nav.Link as={RouterNavLink} to={loggedIn ? "/my-page" : "/login"}>
           {loggedIn ? <PrimaryButton buttonText="Min sida" /> : <PrimaryButton buttonText="Logga in" />}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>

    
  );
}

export default Header;
