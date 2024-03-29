import { useState, useEffect } from "react";
import { Container, Button, Stack, Table } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import { useNavigate } from "react-router-dom";
import "../styles/myBatches.css";
import Loading from "../components/Loading";

const MyBatches = () => {
  const { getMyBatches } = useBatchContext();
  const [myBatches, setMyBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMyBatches()
      .then((data) => {
        setMyBatches(data);
        setLoading(false);
      })
      .catch((err) => {
        // setLoading(false);
        console.error(err);
      });
  }, [getMyBatches]);

  const createFirstBatch = () => navigate("/newbatch");
  const navigateToBatch = (id) => navigate(`/batches/${id}`);

  if (loading) {
    return <Loading />;
  }

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
      {myBatches.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Batch id</th>
                <th>Title</th>
                <th>Created</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {myBatches.map((batch, index) => {
                const { title, createdAt, published, id } = batch;
                return (
                  <tr
                    className={
                      published === true
                        ? "table-light table-row"
                        : "table-secondary table-row"
                    }
                    onClick={() => navigateToBatch(id)}
                    key={index}
                  >
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{new Date(createdAt).toLocaleDateString()}</td>
                    <td>{published === true ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default MyBatches;
