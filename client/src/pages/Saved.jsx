import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";
import PublishedBatch from "../components/PublishedBatch";

const Saved = () => {
  const { loggedInUser } = useGlobalContext();
  const [savedBatches, setSavedBatches] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      setSavedBatches(loggedInUser.saved);
    }
  }, [loggedInUser]);

  return (
    <Container>
      <h4 className="mt-4 mb-4 text-center">My Saved Batches</h4>
      {savedBatches.map((batch) => {
        console.log("saved batch:", batch);
        return <PublishedBatch batch={batch} small={true} key={batch.id} />;
      })}
    </Container>
  );
};

export default Saved;
