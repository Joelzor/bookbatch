import { useState } from "react";
import "../styles/batch.css";
import { AiFillPlusCircle, AiFillEdit } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { Card, Stack, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import defaultImage from "../images/notfound.png";

const Batch = ({ handleShow }) => {
  const { deleteLocalBook, localTitle, setLocalTitle, localBooks } =
    useBatchContext();
  const [showTitleModal, setShowTitleModal] = useState(false);

  const handleTitleModalClose = () => setShowTitleModal(false);
  const handleTitleModalShow = () => setShowTitleModal(true);

  // console.log("rendering local books,:", localBooks);
  // useEffect(() => {
  //   if (localBooks.find((book) => book.fromDB === true)) {
  //     console.log("found books coming from DB");
  //   }
  // }, []);

  return (
    <>
      <Card className="batch-container">
        <Card.Header className="batch-header">
          <p>{localTitle}</p>
          <AiFillEdit
            className="edit-batch-title-btn"
            onClick={handleTitleModalShow}
          />
        </Card.Header>
        <Row>
          {localBooks.map((book) => {
            console.log(book);
            const { title, imageLinks } = book.volumeInfo;
            return (
              <Col key={book.id}>
                <Stack gap={2} className="p-2 book-container">
                  <img
                    src={imageLinks?.smallThumbnail || defaultImage}
                    alt={`${title} cover`}
                    className="book-image"
                  />
                  <p className="title-text">{title}</p>
                  <ImCross
                    className="delete-icon"
                    onClick={() => deleteLocalBook(book.id)}
                  />
                </Stack>
              </Col>
            );
          })}

          <Col>
            {localBooks.length < 6 && (
              <Stack className="batch-column">
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
      <Modal show={showTitleModal} onHide={handleTitleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                required
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleTitleModalClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Batch;
