import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";
import PublishedBatch from "../components/PublishedBatch";
import { useBatchContext } from "../context/batch";
import tagOptions from "../data/tag-options";

import "../styles/browse.css";

const Browse = () => {
  const { getAllBatches } = useBatchContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [batches, setBatches] = useState([]);
  const [results, setResults] = useState(null);
  const [resultsCopy, setResultsCopy] = useState(null);
  const [tagFilters, setTagFilters] = useState([]);
  const [checking, setChecking] = useState(false);
  // const searchParams = useSearchParams()[0];

  useEffect(() => {
    getAllBatches().then((data) => setBatches(data));
  }, [getAllBatches]);

  // useEffect(() => {
  //   const query = searchParams.get("query");
  //   if (query) {
  //     setSearchQuery(query);
  //   }
  // }, [searchParams]);

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
    setResultsCopy(uniqueResults);
  };

  const handleChange = (e) => {
    setChecking(!checking);
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked === true) {
      setTagFilters([...tagFilters, value]);
    }

    if (checked === false) {
      setTagFilters((prevFilters) => {
        return prevFilters.filter((tag) => tag !== value);
      });
    }

    if (!results) return;

    filterResults();
  };

  const filterResults = useCallback(() => {
    if (!results) return;

    // setting results back to the original search
    if (tagFilters.length === 0) {
      setResults(resultsCopy);
      return;
    }

    // checking if every selected tag in the filters matches the batch tags
    const filteredResults = results.filter((batch) => {
      return tagFilters.every((tag) => {
        return batch.tags.map((batchTag) => batchTag.title).includes(tag);
      });
    });

    setResults(filteredResults);
  }, [results, resultsCopy, tagFilters]);

  useEffect(() => {
    filterResults();
  }, [checking]);

  return (
    <Container className="p-4">
      <Row>
        <Col xs={12} xxl={9}>
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
            <h4 className="tag-title">Default Tags</h4>
            <ul className="tag-list">
              {tagOptions.map((tag, index) => {
                return (
                  <li key={index}>
                    <Form.Check
                      type="checkbox"
                      value={tag.title}
                      label={tag.title}
                      onChange={handleChange}
                    />
                  </li>
                );
              })}
            </ul>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Browse;
