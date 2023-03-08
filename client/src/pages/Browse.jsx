import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col, Button, Stack } from "react-bootstrap";
import PublishedBatch from "../components/PublishedBatch";
import "../styles/browse.css";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
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
          <Stack gap={4}></Stack>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Browse;
