import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";
import PublishedBatch from "../components/PublishedBatch";
import { useBatchContext } from "../context/batch";

import "../styles/browse.css";

const Browse = () => {
  const { getAllBatches } = useBatchContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [batches, setBatches] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getAllBatches().then((data) => setBatches(data));
  }, [getAllBatches]);

  const handleSubmit = (e) => {
    e.preventDefault();

    searchBatches(searchQuery);
  };

  const searchBatches = (query) => {
    const searchResults = batches.filter((batch) => {
      return batch.title.toLowerCase().includes(query.toLowerCase());
    });

    setResults(searchResults);
  };

  return (
    <Container className="p-4">
      <Row>
        <Col xs={9}>
          <Form className="mt-4 search-form" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={searchQuery}
              placeholder="Search batch title or tags..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="info">
              Submit
            </Button>
          </Form>
          <h4 className="search-heading">Search results</h4>
          <Stack>
            {results.length === 0 &&
              searchQuery &&
              "You search returned 0 results. Please try again!"}
            {results.map((result) => {
              return (
                <>
                  <Link
                    to={`/batches/${result.id}`}
                    className="batch-link"
                    key={result.id}
                  >
                    <PublishedBatch batch={result} small={true} />
                  </Link>
                </>
              );
            })}
          </Stack>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Browse;
