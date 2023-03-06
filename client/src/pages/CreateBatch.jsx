import { useState } from "react";
import { useGlobalContext } from "../context/auth";
import { useBatchContext } from "../context/batch";
import "../styles/batch.css";
import { Container, Modal, Button, Form, Stack } from "react-bootstrap";
import Batch from "../components/Batch";
import BookResult from "../components/BookResult";
import CreateTags from "../components/CreateTags";
import CreatePost from "../components/CreatePost";
import Notification from "../components/Notification";

const CreateBatch = () => {
  const { loggedInUser } = useGlobalContext();
  const { searchBooks, createBatch, localBooks, localTags } = useBatchContext();
  const [showBookModal, setShowBookModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [errorResponse, setErrorResponse] = useState(false);

  const handleClose = () => setShowBookModal(false);
  const handleShow = () => setShowBookModal(true);
  const handlePublishClose = () => setShowPublishModal(false);
  const handlePublishShow = () => setShowPublishModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchResults = await searchBooks(searchQuery);
    setResults(searchResults);
  };

  const publish = () => {
    setErrorResponse(false);
    createBatch();
  };

  const checkBatchStatus = () => {
    if (localBooks.length < 3) {
      setErrorResponse(true);
      return;
    }

    handlePublishShow();
  };

  const warningGenerator = () => {
    // if (localTags.length === 0 && !localPost) {
    //   return "You have no tags or post! Are you sure you want to publish?";
    // } else if (localTags.length === 0) {
    //   return "You don't have any tags! Are you sure you want to publish?";
    // } else if (!localPost) {
    //   return "You haven't written a post! Are you sure you want to publish?";
    // }

    if (localTags.length === 0) {
      return "You don't have any tags! Are you sure you want to publish?";
    }

    return "Are you sure you want to publish your batch?";
  };

  const removeAlert = () => {
    setTimeout(() => {
      setErrorResponse(false);
    }, 2000);
  };

  return (
    <>
      {loggedInUser && (
        <Container className="p-2">
          <h4 className="mt-4 mb-4">
            Hello {loggedInUser.username}. Create your batch below!
          </h4>
          <h5>Books</h5>
          <p>Click on the + icon to find a book!</p>
          <Stack direction="horizontal" gap={4}>
            <Batch handleShow={handleShow} />
            <Stack gap={3}>
              <Button variant="success" onClick={checkBatchStatus}>
                Publish
              </Button>
              <Button variant="outline-info">Save for later</Button>
              <Button variant="outline-secondary">Clear all</Button>
              {errorResponse && (
                <>
                  <Notification
                    message="You need at least 3 books!"
                    type="secondary"
                  />
                  {removeAlert()}
                </>
              )}
            </Stack>
          </Stack>
          <CreateTags />
          <CreatePost />

          {/* search modal */}
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

          {/* publish modal */}
          <Modal show={showPublishModal} onHide={handlePublishClose}>
            <Modal.Header closeButton>
              <Modal.Title>Publish batch</Modal.Title>
            </Modal.Header>
            <Modal.Body>{warningGenerator()}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePublishClose}>
                Back
              </Button>
              <Button variant="primary" onClick={publish}>
                {localTags.length === 0 ? "Publish anyway" : "Publish"}
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default CreateBatch;
