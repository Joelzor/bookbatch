import { useState } from "react";
import { useGlobalContext } from "../context/auth";
import "../styles/batch.css";
import { Container, Modal, Button } from "react-bootstrap";
import Batch from "./Batch";

const CreateBatch = () => {
  const { loggedInUser } = useGlobalContext();
  const [showBookModal, setShowBookModal] = useState(false);

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
              <Modal.Title>Add book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default CreateBatch;
