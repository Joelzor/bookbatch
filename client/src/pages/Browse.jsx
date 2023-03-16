import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";
import PublishedBatch from "../components/PublishedBatch";
import { useBatchContext } from "../context/batch";

import "../styles/browse.css";

const Browse = () => {
  const { getAllBatches } = useBatchContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [batches, setBatches] = useState([]);
  const [results, setResults] = useState(null);
  const searchParams = useSearchParams()[0];

  useEffect(() => {
    getAllBatches().then((data) => setBatches(data));
  }, [getAllBatches]);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    searchBatches(searchQuery);
  };

  const searchBatches = (query) => {
    const titleResults = batches.filter((batch) => {
      return batch.title.toLowerCase().includes(query.toLowerCase());
    });

    const tagResults = [];
    batches.forEach((batch) => {
      const filteredTags = batch.tags.filter((tag) =>
        tag.title.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredTags.length > 0) tagResults.push(batch);
    });

    const results = [...titleResults, ...tagResults];
    const uniqueResults = [...new Set(results)];

    setResults(uniqueResults);
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
            {!results ||
              (results.length === 0 &&
                "You search returned 0 results. Please try again!")}
            {results &&
              results.map((result) => {
                return (
                  <div key={result.id}>
                    <Link to={`/batches/${result.id}`} className="batch-link">
                      <PublishedBatch batch={result} small={true} />
                    </Link>
                  </div>
                );
              })}
          </Stack>
        </Col>
        <Col>
          <Stack className="tag-container">
            <h4 className="tag-title">Tags</h4>
            <ul className="tag-list">
              <li>
                <Form.Check type="checkbox" label="crime" />
              </li>
              <li>
                <Form.Check type="checkbox" label="fantasy" />
              </li>
              <li>
                <Form.Check type="checkbox" label="sci-fi" />
              </li>
              <li>
                <Form.Check type="checkbox" label="history" />
              </li>
              <li>
                <Form.Check type="checkbox" label="philosophy" />
              </li>
            </ul>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Browse;
