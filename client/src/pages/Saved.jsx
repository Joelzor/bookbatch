import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/auth";
import { useBatchContext } from "../context/batch";
import PublishedBatch from "../components/PublishedBatch";
import Loading from "../components/Loading";
import "../styles/saved.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/home.css";
import Skeleton from "react-loading-skeleton";

const Saved = () => {
  const { loggedInUser } = useGlobalContext();
  const { deleteBatchFromSaved, getSavedBatches } = useBatchContext();
  const [savedBatches, setSavedBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedBatches()
      .then((data) => {
        setSavedBatches(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [getSavedBatches, loggedInUser?.saved]);

  const onDelete = (batchId) => {
    deleteBatchFromSaved(batchId);
    setSavedBatches((prev) => {
      return prev.filter((batch) => batch.id !== batchId);
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container className="p-4">
      <h4 className="mt-4 mb-4 text-center">My Saved Batches</h4>
      {savedBatches && savedBatches.length === 0 && (
        <p className="text-center">You currently have no saved batches.</p>
      )}
      {(savedBatches &&
        savedBatches.map((batch) => {
          return (
            <Row className="saved-row" key={batch.id}>
              <Col xs={10}>
                <Link to={`/batches/${batch.id}`} className="batch-link">
                  <PublishedBatch batch={batch} small={true} key={batch.id} />
                </Link>
              </Col>
              <Col>
                <Button variant="secondary" onClick={() => onDelete(batch.id)}>
                  Remove
                </Button>
              </Col>
            </Row>
          );
        })) || <Skeleton />}
    </Container>
  );
};

export default Saved;
