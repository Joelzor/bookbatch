import { useEffect, useState } from "react";
import { Card, Row, Col, Stack, Badge } from "react-bootstrap";
import "../styles/batchView.css";
// import colourGenerator from "../utils/tagColourGenerator";

const PublishedBatch = ({ batch, small = false }) => {
  const [publishedBooks, setPublishedBooks] = useState(batch.books);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (width > 768) setPublishedBooks(batch.books);
    if (width <= 768)
      setPublishedBooks([batch.books[0], batch.books[1], batch.books[2]]);
  }, [width, batch.books]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (width <= 768 && small) {
        setPublishedBooks([batch.books[0], batch.books[1], batch.books[2]]);
      }
      if (width > 768) {
        setPublishedBooks(batch.books);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <Card className={small ? "mt-4 batch-card-small" : "mt-4 batch-container"}>
      <Card.Header className="batch-header">
        <p>{batch.title}</p>
        <p>{`Created by ${batch.user.username}`}</p>
      </Card.Header>
      <Row className={small ? "book-row-small" : ""}>
        {publishedBooks.map((book) => {
          return (
            <Col key={book.id} className="p-3 book-container">
              <Stack gap={2}>
                <img
                  src={book.cover || null}
                  alt={`${book.title} cover`}
                  className={small ? "book-image-small" : "book-image"}
                />
                <p className="title-text">{book.title}</p>
                <p className="author-text">{book.author || "No author data"}</p>
              </Stack>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Stack direction="horizontal" gap={2} className="mt-2">
          {batch.tags.map((tag) => {
            return (
              <Badge key={tag.id} bg="secondary">
                {tag.title}
              </Badge>
            );
          })}
        </Stack>
      </Row>
    </Card>
  );
};

export default PublishedBatch;
