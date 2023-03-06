import { Card, Row, Col, Stack, Badge } from "react-bootstrap";
import "../styles/batchView.css";

const PublishedBatch = ({ batch, small = false }) => {
  return (
    <Card className={small ? "mt-4 batch-card-small" : "mt-4 batch-container"}>
      <Card.Header className="batch-header">
        <p>{batch.title}</p>
        <p>{`Created by ${batch.user.username}`}</p>
      </Card.Header>
      <Row className={small ? "book-row-small" : ""}>
        {batch.books.map((book) => {
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
              <Badge key={tag.id} bg="primary">
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
