import { NavLink } from "react-router";
import { useAuth } from "../../context/AuthProvider";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function MyPageNav() {
  const { user } = useAuth();

  const isAdmin = user?.roles?.includes("Admin") ?? false;

  return (
    <Navbar
      expand="md"
      bg="dark"
      variant="dark"
      className="mb-4 rounded shadow-sm"
    >
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand>Mina sidor</Navbar.Brand>

        {/* Hamburger */}
        <Navbar.Toggle aria-controls="mypage-nav" />

        {/* Collapse */}
        <Navbar.Collapse id="mypage-nav">
          <Nav className="me-auto">

            <Nav.Link as={NavLink} to="/mypage/auctions">
              Mina auktioner
            </Nav.Link>

            <Nav.Link as={NavLink} to="/mypage/bids">
              Mina bud
            </Nav.Link>

            <Nav.Link as={NavLink} to="/mypage/create">
              Skapa auktion
            </Nav.Link>

            {/* Inställningar */}
            <NavDropdown title="Inställningar" id="settings-dropdown">
              <NavDropdown.Item
                as={NavLink}
                to="/mypage/update-password"
              >
                Uppdatera lösenord
              </NavDropdown.Item>
            </NavDropdown>

            {/* Admin Dropdown */}
            {isAdmin && (
              <NavDropdown
                title="Admin"
                id="admin-dropdown"
              >
                <NavDropdown.Item
                  as={NavLink}
                  to="/mypage/admin/users"
                >
                  Användare
                </NavDropdown.Item>

                <NavDropdown.Item
                  as={NavLink}
                  to="/mypage/admin/auctions"
                >
                  Auktioner
                </NavDropdown.Item>
              </NavDropdown>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyPageNav;
