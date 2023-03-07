import { useState, useEffect } from "react";
import "../styles/batch.css";
import { AiFillPlusCircle, AiFillEdit } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { Card, Stack, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import defaultImage from "../images/notfound.png";

const Batch = ({ handleShow, localBooks }) => {
  const { deleteLocalBook, localTitle, setLocalTitle } = useBatchContext();
  const [showTitleModal, setShowTitleModal] = useState(false);
  // const [render, setRender] = useState(false);

  const handleTitleModalClose = () => setShowTitleModal(false);
  const handleTitleModalShow = () => setShowTitleModal(true);

  // console.log("rendering local books,:", localBooks);
  // useEffect(() => {
  //   if (localBooks > 0) {
  //     setRender(true);
  //   }
  // }, [localBooks]);

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
            const { title, imageLinks } = book.volumeInfo;
            console.log("hello");
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
