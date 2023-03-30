// import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form } from "react-bootstrap";
import { TbBook } from "react-icons/tb";
import { useGlobalContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { loggedInUser, logout } = useGlobalContext();
  // const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const userLogout = () => {
    logout();
    navigate("/");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!query) return;

  //   const params = new URLSearchParams({ query });
  //   navigate({ pathname: "/batches", search: params.toString() });
  // };

  return (
    <header>
      <Navbar variant="dark" bg="primary" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand
            href="/dashboard"
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              fontSize: "24px",
            }}
          >
            BOOKBATCH
            <TbBook />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              {!loggedInUser && (
                <>
                  <Nav.Link href="/dashboard">Home</Nav.Link>
                  <Nav.Link href="/batches">Search</Nav.Link>
                  <Nav.Link href="/login">Log in</Nav.Link>
                  <Nav.Link href="/register">Sign up</Nav.Link>
                </>
              )}
              {loggedInUser && (
                <>
                  {/* <Form className="d-flex" onSubmit={handleSubmit}>
                    <Form.Control
                      type="search"
                      value={query}
                      placeholder="Search batches..."
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </Form> */}
                  <Nav.Link href="/dashboard">Home</Nav.Link>
                  <Nav.Link href="/batches">Search</Nav.Link>
                  <NavDropdown title="Batches">
                    <NavDropdown.Item href="/newbatch">
                      Create a batch
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/mybatches">
                      My batches
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/saved">Saved</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Profile">
                    <NavDropdown.Item href={`/profile/${loggedInUser.id}`}>
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
