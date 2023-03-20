import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/auth";
import { useBatchContext } from "../context/batch";
import "../styles/batch.css";
import { ImBooks } from "react-icons/im";
import { Container, Modal, Button, Form, Stack } from "react-bootstrap";
import Batch from "../components/Batch";
import BookResult from "../components/BookResult";
import CreateTags from "../components/CreateTags";
import CreatePost from "../components/CreatePost";
import Notification from "../components/Notification";

const CreateBatch = ({ editing = false }) => {
  const { loggedInUser } = useGlobalContext();
  const {
    searchBooks,
    createBatch,
    localBooks,
    localTags,
    clearAll,
    setUpBatchEdit,
    localPost,
  } = useBatchContext();
  const [showBookModal, setShowBookModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [errorResponse, setErrorResponse] = useState(false);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClose = () => setShowBookModal(false);
  const handleShow = () => setShowBookModal(true);
  const handlePublishClose = () => setShowPublishModal(false);
  const handlePublishShow = () => setShowPublishModal(true);
  const handleSaveClose = () => setShowSaveModal(false);
  const handleSaveShow = () => setShowSaveModal(true);

  // editing
  useEffect(() => {
    if (editing) {
      setUpBatchEdit(id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchResults = await searchBooks(searchQuery);
    setResults(searchResults);
  };

  const publish = async () => {
    setErrorResponse(false);
    if (editing) {
      createBatch(true, true, id);
      return navigate("/");
    }
    setGenerating(true);
    const newBatch = await createBatch();
    navigate(`/batches/${newBatch.id}`);
  };

  const save = async () => {
    if (editing) {
      createBatch(false, true, id);
      return navigate("/");
    }
    createBatch(false);
    navigate("/");
  };

  const checkBatchStatus = () => {
    if (localBooks.length < 5) {
      setErrorResponse(true);
      return;
    }

    handlePublishShow();
  };

  const warningGenerator = () => {
    if (localTags.length === 0 && !localPost) {
      return "You have no tags or post! Are you sure you want to publish?";
    } else if (localTags.length === 0) {
      return "You don't have any tags! Are you sure you want to publish?";
    } else if (!localPost) {
      return "You haven't written a post! Are you sure you want to publish?";
    }

    return editing
      ? "Are you ready to publish? Your changes may take a few minutes to appear!"
      : "Are you sure you want to publish your batch?";
  };

  const removeAlert = () => {
    setTimeout(() => {
      setErrorResponse(false);
    }, 2000);
  };

  if (generating) {
    return <h4 className="mt-4 text-center">Publishing batch! Stand by...</h4>;
  }

  return (
    <>
      {loggedInUser && (
        <Container className="p-4">
          <h4 className="mt-4 mb-4">
            Hello {loggedInUser.username}. {editing ? "Edit" : "Create"} your
            batch below!
          </h4>
          <h5 className="create-heading">
            <ImBooks className="create-icon" />
            Books
          </h5>
          <p>Click on the + icon to find a book!</p>
          <Stack direction="horizontal" gap={4}>
            <Batch handleShow={handleShow} />
            <Stack gap={3}>
              <Button variant="success" onClick={checkBatchStatus}>
                Publish
              </Button>
              <Button variant="outline-info" onClick={handleSaveShow}>
                Save for later
              </Button>
              <Button variant="outline-secondary" onClick={clearAll}>
                Clear all
              </Button>
              {errorResponse && (
                <>
                  <Notification
                    message="You need at least 5 books!"
                    type="secondary"
                  />
                  {removeAlert()}
                </>
              )}
            </Stack>
          </Stack>
          <CreateTags editing={editing} />
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
                    placeholder="Search for a book title..."
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

          {/* save modal */}
          <Modal show={showSaveModal} onHide={handleSaveClose}>
            <Modal.Header closeButton>
              <Modal.Title>Save batch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              By confirming, you are saving this batch for later. It will not be
              published.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleSaveClose}>
                Back
              </Button>
              <Button variant="primary" onClick={save}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default CreateBatch;
