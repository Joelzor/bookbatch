import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useBatchContext } from "../context/batch";

const BatchView = () => {
  const { getBatch } = useBatchContext();
  const [batch, setBatch] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getBatch(id).then((data) => {
      // error handling if batch id doesn't exist
      setBatch(data);
    });
  }, [getBatch, id]);

  return (
    <Container>
      <h4>Batch view page</h4>
    </Container>
  );
};

export default BatchView;
