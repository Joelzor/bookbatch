import { Container, Stack, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBatchContext } from "../context/batch";
import PublishedBatch from "../components/PublishedBatch";
import { useEffect, useState } from "react";
import "../styles/home.css";

const Home = () => {
  const { getAllBatches } = useBatchContext();
  const [batches, setBatches] = useState([]);
  const [lastBatch, setLastBatch] = useState(null);
  const [secondLastBatch, setSecondLastBatch] = useState(null);

  useEffect(() => {
    getAllBatches().then((data) => setBatches(data));
  }, [getAllBatches]);

  useEffect(() => {
    if (batches) {
      setLastBatch(batches[batches.length - 1]);
      setSecondLastBatch(batches[batches.length - 2]);
    }
  }, [batches]);

  return (
    <Container className="p-4">
      <h4 className="mt-4 mb-4 text-center">WELCOME BACK</h4>
      <Row>
        <Col xs={9}>
          <h5>Latest batches</h5>
          <Stack>
            {lastBatch && secondLastBatch && (
              <>
                <Link to={`/batches/${lastBatch.id}`} className="batch-link">
                  <PublishedBatch batch={lastBatch} small={true} />
                </Link>
                <Link
                  to={`/batches/${secondLastBatch.id}`}
                  className="batch-link"
                >
                  <PublishedBatch batch={secondLastBatch} small={true} />
                </Link>
              </>
            )}
          </Stack>
        </Col>
        <Col>
          <Stack className="newsfeed-container">
            <h5>Latest news</h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
              totam adipisci, nam maiores accusamus repudiandae rerum quos odio
              rem commodi debitis quod necessitatibus illum eius. Nostrum
              cupiditate mollitia non qui.
            </p>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
