import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Stack, Button } from "react-bootstrap";
import PublishedBatch from "../components/PublishedBatch";
import ReactMarkdown from "react-markdown";
import { useBatchContext } from "../context/batch";
import { useGlobalContext } from "../context/auth";
import "../styles/batchView.css";

const BatchView = () => {
  const { getBatch } = useBatchContext();
  const { loggedInUser } = useGlobalContext();
  const [batch, setBatch] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getBatch(id).then((data) => {
      // error handling if batch id doesn't exist
      setBatch(data);
    });
  }, [getBatch, id]);

  console.log("user:", loggedInUser);
  console.log(batch);

  return (
    <Container>
      {batch && (
        <>
          <Stack direction="horizontal" gap={4} className="batch-btn-container">
            <PublishedBatch batch={batch} />
            <Stack gap={3} className="btn-container">
              <Button variant="outline-info">Save to favourites</Button>
              {loggedInUser && loggedInUser.id === batch.userId && (
                <Button variant="outline-success">Edit batch</Button>
              )}
            </Stack>
          </Stack>
          <Stack className="mt-4">
            <ReactMarkdown>{batch.post.body}</ReactMarkdown>
          </Stack>
          <Stack className="mt-4">
            <h5>Comments</h5>
            {batch.post.comments.length === 0 &&
              "This batch currently has no comments"}
          </Stack>
        </>
      )}
    </Container>
  );
};

export default BatchView;
