import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";
import { useBatchContext } from "../context/batch";
import PublishedBatch from "../components/PublishedBatch";
import "../styles/saved.css";

const Saved = () => {
  const { loggedInUser } = useGlobalContext();
  const { deleteBatchFromSaved } = useBatchContext();
  const [savedBatches, setSavedBatches] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      setSavedBatches(loggedInUser.saved);
    }
  }, [loggedInUser]);

  const onDelete = (batchId) => {
    deleteBatchFromSaved(batchId);
    setSavedBatches((prev) => {
      return prev.filter((batch) => batch.id !== batchId);
    });
  };

  // link to batchview page
  // get delete button working + replace with icon?

  return (
    <Container className="p-4">
      <h4 className="mt-4 mb-4 text-center">My Saved Batches</h4>
      {savedBatches.map((batch) => {
        return (
          <Row className="saved-row" key={batch.id}>
            <Col xs={10}>
              <PublishedBatch batch={batch} small={true} key={batch.id} />
            </Col>
            <Col>
              <Button variant="secondary" onClick={() => onDelete(batch.id)}>
                Remove
              </Button>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default Saved;
