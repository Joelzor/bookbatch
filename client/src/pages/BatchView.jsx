import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Stack,
  Col,
  Badge,
  Button,
} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useBatchContext } from "../context/batch";
import { useGlobalContext } from "../context/auth";
import "../styles/batchView.css";

const BatchView = () => {
  const { getBatch } = useBatchContext();
  const { loggedInUser } = useGlobalContext();
  const [batch, setBatch] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getBatch(id).then((data) => {
      // error handling if batch id doesn't exist
      setBatch(data);
    });
  }, [getBatch, id]);

  console.log("user:", loggedInUser);
  console.log(batch);

  return (
    <Container>
      {batch && (
        <>
          <Stack direction="horizontal" gap={4} className="batch-btn-container">
            <Card className="batch-container mt-4">
              <Card.Header className="batch-header">
                <p>{batch.title}</p>
                <p>{`Created by ${batch.user.username}`}</p>
              </Card.Header>
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
                        <p className="author-text">
                          {book.author || "No author data"}
                        </p>
                      </Stack>
                    </Col>
                  );
                })}
              </Row>
              <Row>
                <Stack direction="horizontal" gap={2} className="mt-2">
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
            <Stack gap={3} className="btn-container">
              <Button variant="outline-info">Save to favourites</Button>
              {loggedInUser.id === batch.userId && (
                <Button variant="outline-success">Edit batch</Button>
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
    </Container>
  );
};

export default BatchView;
