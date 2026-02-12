import PrimaryButton from "../Buttons/PrimaryButton";
import { NavLink as RouterNavLink } from "react-router";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import style from "./Header.module.css";
import Logo from "../Logo/Logo";
import { useAuth } from "../../context/AuthProvider";



function Header() {

const { isLoggedIn, logout } = useAuth();



  return (
    <header className={style.header}> 
      
    <Navbar expand="md" bg="dark" variant="dark" className="px-3">
      <Container fluid>
        
        <Navbar.Brand as={RouterNavLink} to="/">
          <Logo />
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
          <Nav.Link as={RouterNavLink} to={isLoggedIn ? "/mypage" : "/register"}>
           {isLoggedIn ? <PrimaryButton buttonText="Min sida" /> : <PrimaryButton buttonText="Registrera" />}
          </Nav.Link>
          <Nav.Link as={RouterNavLink} to={isLoggedIn ? "/" : "/login"}>
           {isLoggedIn ? <PrimaryButton buttonEvent={logout} buttonText="Logga ut" /> : <PrimaryButton buttonText="Logga in" />}
          </Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </header>
  );
}

export default Header;
