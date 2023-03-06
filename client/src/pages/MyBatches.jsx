import { useState, useEffect } from "react";
import { Container, Button, Stack } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import { useNavigate } from "react-router-dom";

const MyBatches = () => {
  const { getMyBatches } = useBatchContext();
  const [myBatches, setMyBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyBatches().then((data) => setMyBatches(data));
  }, [getMyBatches]);

  const createFirstBatch = () => navigate("/newbatch");

  return (
    <Container>
      <h4 className="mt-4 text-center">My Batches</h4>
      {myBatches.length < 1 && (
        <Stack gap={4} className="mt-4 text-center">
          <p>You haven't made any batches yet!</p>
          <Button
            variant="dark"
            onClick={createFirstBatch}
            style={{ width: "180px", margin: "0 auto" }}
          >
            Create my first
          </Button>
        </Stack>
      )}
    </Container>
  );
};

export default MyBatches;
