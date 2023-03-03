import { useState } from "react";
import { useGlobalContext } from "../context/auth";
import { useBatchContext } from "../context/batch";
import "../styles/batch.css";
import { Container, Modal, Button, Form, Stack } from "react-bootstrap";
import Batch from "./Batch";
import BookResult from "./BookResult";
import CreateTags from "./CreateTags";

const CreateBatch = () => {
  const { loggedInUser } = useGlobalContext();
  const { searchBooks } = useBatchContext();
  const [showBookModal, setShowBookModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleClose = () => setShowBookModal(false);
  const handleShow = () => setShowBookModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchResults = await searchBooks(searchQuery);
    setResults(searchResults);
  };

  return (
    <>
      {loggedInUser && (
        <Container>
          <h5 className="mt-4 mb-4">
            Hello {loggedInUser.username}. Create your batch below!
          </h5>
          <Stack direction="horizontal" gap={4}>
            <Batch handleShow={handleShow} />
            <Stack gap={3}>
              <Button variant="success">Publish</Button>
              <Button variant="outline-info">Save for later</Button>
              <Button variant="outline-secondary">Clear all</Button>
            </Stack>
          </Stack>
          <CreateTags />

          {/* modal section */}
          <Modal show={showBookModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Find book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="search-form-modal" onSubmit={handleSubmit}>
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
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Form>
              <Stack gap={4} className="mt-4">
                {results.map((book) => {
                  return (
                    <BookResult
                      key={book.id}
                      bookInfo={book}
                      handleClose={handleClose}
                    />
                  );
                })}
              </Stack>
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
