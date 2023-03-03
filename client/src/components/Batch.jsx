import "../styles/batch.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Card, Stack, Row, Col } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import defaultImage from "../images/notfound.png";

const Batch = ({ handleShow }) => {
  const { localBooks } = useBatchContext();

  return (
    <Card className="batch-container">
      <Card.Header>My batch</Card.Header>
      <Row>
        {localBooks.map((book) => {
          const { title, imageLinks } = book.volumeInfo;
          return (
            <Col key={book.id}>
              <Stack gap={2} className="p-2">
                <img
                  src={imageLinks?.smallThumbnail || defaultImage}
                  alt={`${title} cover`}
                  className="book-image"
                />
                <p className="title-text">{title}</p>
              </Stack>
            </Col>
          );
        })}
        <Col>
          {localBooks.length < 6 && (
            <Stack className="batch-column" style={{ height: "150px" }}>
              <AiFillPlusCircle
                className="add-batch-btn"
                onClick={handleShow}
              />
            </Stack>
          )}
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Card>
  );
};

export default Batch;
