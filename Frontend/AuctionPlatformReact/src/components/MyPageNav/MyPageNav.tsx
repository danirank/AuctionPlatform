import { NavLink } from "react-router";
import { useAuth } from "../../context/AuthProvider";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import styles from "./MyPageNav.module.css";

function MyPageNav() {
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes("Admin") ?? false;

  return (
    <Navbar bg="dark" variant="dark" className={`mb-4 rounded shadow-sm ${styles.navbar}`}>
      <Container fluid className={styles.container}>
        <Navbar.Brand className={styles.brand}>Mina sidor</Navbar.Brand>

        
        <Nav className={styles.rightNav}>
          <NavDropdown
            align="end"
            title="Meny"
            id="mypage-menu-dropdown"
            className={styles.dropdown}
          >
            <NavDropdown.Header>Mina sidor</NavDropdown.Header>

            <NavDropdown.Item as={NavLink} to="/mypage/auctions">
              Mina auktioner
            </NavDropdown.Item>

            <NavDropdown.Item as={NavLink} to="/mypage/bids">
              Mina bud
            </NavDropdown.Item>

            <NavDropdown.Item as={NavLink} to="/mypage/create">
              Skapa auktion
            </NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Header>Inställningar</NavDropdown.Header>
            <NavDropdown.Item as={NavLink} to="/mypage/update-password">
              Uppdatera lösenord
            </NavDropdown.Item>

            {isAdmin && (
              <>
                <NavDropdown.Divider />
                <NavDropdown.Header>Admin</NavDropdown.Header>

                <NavDropdown.Item as={NavLink} to="/mypage/admin/users">
                  Användare
                </NavDropdown.Item>

                <NavDropdown.Item as={NavLink} to="/mypage/admin/auctions">
                  Auktioner
                </NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyPageNav;
