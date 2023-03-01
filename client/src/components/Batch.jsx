import "../styles/batch.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { Card, Stack, Row, Col } from "react-bootstrap";

const Batch = ({ handleShow }) => {
  return (
    <Card className="batch-container">
      <Card.Header>My batch</Card.Header>
      <Row>
        <Col>
          <Stack className="batch-column" style={{ height: "150px" }}>
            <AiFillPlusCircle className="add-batch-btn" onClick={handleShow} />
          </Stack>
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
