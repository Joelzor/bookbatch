import { useState } from "react";
import { useGlobalContext } from "../context/auth";
import "../styles/batch.css";
import { Container, Modal, Button, Form } from "react-bootstrap";
import Batch from "./Batch";

const CreateBatch = () => {
  const { loggedInUser } = useGlobalContext();
  const [showBookModal, setShowBookModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClose = () => setShowBookModal(false);
  const handleShow = () => setShowBookModal(true);

  return (
    <>
      {loggedInUser && (
        <Container>
          <h5 className="mt-2 mb-4">
            Hello {loggedInUser.username}. Create your batch below!
          </h5>
          <Batch handleShow={handleShow} />
          <Modal show={showBookModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Find book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="search-form-modal">
                <Form.Group controlId="query">
                  <Form.Control
                    required
                    type="search"
                    name="query"
                    value={searchQuery}
                    placeholder="Search for a book..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="searchbar"
                  />
                </Form.Group>
                <Button variant="primary">Search</Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default CreateBatch;
