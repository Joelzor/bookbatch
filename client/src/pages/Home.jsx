import { Container, Stack } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import PublishedBatch from "../components/PublishedBatch";
import { useEffect, useState } from "react";

const Home = () => {
  const { batches } = useBatchContext();
  const [lastBatch, setLastBatch] = useState(null);
  const [secondLastBatch, setSecondLastBatch] = useState(null);

  useEffect(() => {
    setLastBatch(batches[batches.length - 1]);
    setSecondLastBatch(batches[batches.length - 2]);
  }, [batches]);

  return (
    <Container>
      <h4 className="mt-4 text-center">WELCOME BACK</h4>
      <h5>Latest batches</h5>
      <Stack>
        {lastBatch && secondLastBatch && (
          <>
            <PublishedBatch batch={lastBatch} small={true} />
            <PublishedBatch batch={secondLastBatch} small={true} />
          </>
        )}
      </Stack>
    </Container>
  );
};

export default Home;
