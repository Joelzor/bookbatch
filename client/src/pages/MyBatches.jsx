import { useState, useEffect } from "react";
import { Container, Button, Stack, Table } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import { useNavigate } from "react-router-dom";
import "../styles/myBatches.css";

const MyBatches = () => {
  const { getMyBatches } = useBatchContext();
  const [myBatches, setMyBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyBatches().then((data) => setMyBatches(data));
  }, [getMyBatches]);

  const createFirstBatch = () => navigate("/newbatch");
  const navigateToBatch = (id) => navigate(`/batches/${id}`);

  return (
    <Container>
      <h4 className="mt-4 mb-4 text-center">My Batches</h4>
      {myBatches.length < 1 && (
        <Stack gap={4} className="mt-4 text-center">
          <p>You haven't made any batches yet!</p>
          <Button
            variant="dark"
            onClick={createFirstBatch}
            className="create-first-btn"
          >
            Create my first
          </Button>
        </Stack>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Batch id</th>
            <th>Title</th>
            <th>Created</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myBatches.map((batch) => {
            const { title, createdAt, published, id } = batch;
            return (
              <tr
                className={
                  published === true
                    ? "table-light table-row"
                    : "table-secondary table-row"
                }
                onClick={() => navigateToBatch(id)}
              >
                <td>{id}</td>
                <td>{title}</td>
                <td>{new Date(createdAt).toLocaleDateString()}</td>
                <td>{published === true ? "Yes" : "No"}</td>
                <td>{published === true ? "Delete" : "Delete, Edit"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyBatches;
