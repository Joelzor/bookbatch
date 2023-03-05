import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Stack, Col, Badge } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import "../styles/batchView.css";

const BatchView = () => {
  const { getBatch } = useBatchContext();
  const [batch, setBatch] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getBatch(id).then((data) => {
      // error handling if batch id doesn't exist
      setBatch(data);
    });
  }, [getBatch, id]);

  console.log(batch);

  return (
    <Container>
      {batch && (
        <>
          <Card className="batch-container mt-4">
            <Card.Header>{batch.title}</Card.Header>
            <Row>
              {batch.books.map((book) => {
                return (
                  <Col key={book.id} className="p-3 book-container">
                    <Stack gap={2}>
                      <img
                        src={book.cover || null}
                        alt={`${book.title} cover`}
                        className="book-image"
                      />
                      <p className="title-text">{book.title}</p>
                    </Stack>
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Stack direction="horizontal" gap={2} className="mt-3">
                {batch.tags.map((tag) => {
                  return (
                    <Badge key={tag.id} bg="primary">
                      {tag.title}
                    </Badge>
                  );
                })}
              </Stack>
            </Row>
          </Card>
        </>
      )}
    </Container>
  );
};

export default BatchView;
