import PrimaryButton from "../Buttons/PrimaryButton";
import { NavLink as RouterNavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";
import {authService} from "../../services/AuthService/AuthService";
import style from "./Header.module.css";




function Header() {

const [loggedIn, setLoggedIn] = useState(false);

useEffect(() => {
  const sync = async () => setLoggedIn(await authService.isLoggedIn());

  sync();
  return authService.onAuthChange(sync);
}, []);


  return (
    <header className={style.header}> 
      
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
          </Nav>

        
        <Nav>
          <Nav.Link as={RouterNavLink} to={loggedIn ? "/my-page" : "/register"}>
           {loggedIn ? <PrimaryButton buttonText="Min sida" /> : <PrimaryButton buttonText="Registrera" />}
          </Nav.Link>
          <Nav.Link as={RouterNavLink} to={loggedIn ? "/" : "/login"}>
           {loggedIn ? <PrimaryButton buttonEvent={authService.clearToken} buttonText="Logga ut" /> : <PrimaryButton buttonText="Logga in" />}
          </Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </header>
  );
}

export default Header;
