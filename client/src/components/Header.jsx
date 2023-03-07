import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
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
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search batches..."
                    />
                    {/* <Button type="submit" variant="light" className="btn-sm">
                      Submit
                    </Button> */}
                  </Form>
                  {/* <Nav.Link href="/batches">Search</Nav.Link> */}
                  <NavDropdown title="Batches">
                    <NavDropdown.Item href="/newbatch">
                      Create a batch
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/mybatches">
                      My batches
                    </NavDropdown.Item>
                    <NavDropdown.Item>Saved</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Profile">
                    <NavDropdown.Item href="/profile">
                      My profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={userLogout}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
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
