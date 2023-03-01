import { Navbar, Container, Nav } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { loggedInUser, logout } = useGlobalContext();
  const navigate = useNavigate();

  const userLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <Navbar variant="dark" bg="primary" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">BOOKBATCH</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              {!loggedInUser && (
                <>
                  <Nav.Link href="/login">Log in</Nav.Link>
                  <Nav.Link href="/register">Sign up</Nav.Link>
                </>
              )}
              {loggedInUser && (
                <>
                  <Nav.Link href="/newbatch">Create a batch</Nav.Link>
                  <Nav.Link href="/profile">My profile</Nav.Link>
                  <Nav.Link onClick={userLogout}>Log out</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
