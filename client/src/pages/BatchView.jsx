import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Stack, Button, Modal } from "react-bootstrap";
import PublishedBatch from "../components/PublishedBatch";
import ReactMarkdown from "react-markdown";
import { useBatchContext } from "../context/batch";
import { useGlobalContext } from "../context/auth";
import "../styles/batchView.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BatchView = () => {
  const { getBatch, deleteBatch, addBatchToSaved } = useBatchContext();
  const { loggedInUser } = useGlobalContext();
  const [batch, setBatch] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    getBatch(id).then((data) => {
      // error handling if batch id doesn't exist
      setBatch(data);
    });
  }, [getBatch, id]);

  const onDelete = (id) => {
    deleteBatch(id);
    navigate("/");
  };

  const onSave = (batchId) => {
    addBatchToSaved(batchId);
    navigate("/saved");
  };

  return (
    <Container>
      {batch && (
        <>
          <Stack direction="horizontal" gap={4} className="batch-btn-container">
            {<PublishedBatch batch={batch} /> || <Skeleton />}

            <Stack gap={3} className="btn-container">
              <Button variant="outline-info" onClick={handleShow}>
                Save to favourites
              </Button>
              {loggedInUser && loggedInUser.id === batch.userId && (
                <>
                  <Button
                    variant="outline-success"
                    onClick={() => navigate(`/editbatch/${batch.id}`)}
                  >
                    Edit batch
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => onDelete(batch.id)}
                  >
                    Delete batch
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
          <Stack className="mt-4">
            <ReactMarkdown>{batch.post.body}</ReactMarkdown>
          </Stack>
          <Stack className="mt-4">
            <h5>Comments</h5>
            {batch.post.comments.length === 0 &&
              "This batch currently has no comments"}
          </Stack>
        </>
      )}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to save this batch to your favourites!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="primary" onClick={() => onSave(batch.id)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BatchView;
