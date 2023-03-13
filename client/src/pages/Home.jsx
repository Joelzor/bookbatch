import { Container, Stack, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBatchContext } from "../context/batch";
import PublishedBatch from "../components/PublishedBatch";
import { useEffect, useState } from "react";
import "../styles/home.css";
import openShop from "../images/open-shop.jpg";

const Home = () => {
  const { getAllBatches } = useBatchContext();
  const [batches, setBatches] = useState([]);
  const [lastBatch, setLastBatch] = useState(null);
  const [secondLastBatch, setSecondLastBatch] = useState(null);
  const [thirdLastBatch, setThirdLastBatch] = useState(null);

  useEffect(() => {
    getAllBatches().then((data) => setBatches(data));
  }, [getAllBatches]);

  useEffect(() => {
    if (batches) {
      setLastBatch(batches[batches.length - 1]);
      setSecondLastBatch(batches[batches.length - 2]);
      setThirdLastBatch(batches[batches.length - 3]);
    }
  }, [batches]);

  return (
    <Container className="p-4">
      <h4 className="mt-4 mb-4 text-center">WELCOME BACK</h4>
      <Row>
        {/* xs={9} */}
        <Col xs={12} xxl={9}>
          <h5>Latest batches</h5>
          <Stack>
            {lastBatch && (
              <Link to={`/batches/${lastBatch.id}`} className="batch-link">
                <PublishedBatch batch={lastBatch} small={true} />
              </Link>
            )}
            {secondLastBatch && (
              <Link
                to={`/batches/${secondLastBatch.id}`}
                className="batch-link"
              >
                <PublishedBatch batch={secondLastBatch} small={true} />
              </Link>
            )}
            {thirdLastBatch && (
              <Link to={`/batches/${thirdLastBatch.id}`} className="batch-link">
                <PublishedBatch batch={thirdLastBatch} small={true} />
              </Link>
            )}
          </Stack>
        </Col>
        <Col className="newsfeed">
          <Stack className="newsfeed-container">
            <h5 className="newsfeed-title">Latest news</h5>
            <p className="newsfeed-subheading">Bookbatch launch!</p>
            <p className="newsfeed-text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
              totam adipisci, nam maiores accusamus repudiandae rerum quos odio
              rem commodi debitis quod necessitatibus illum eius. Nostrum
              cupiditate mollitia non qui.
            </p>
            <img src={openShop} alt="shop opening" className="newsfeed-image" />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
