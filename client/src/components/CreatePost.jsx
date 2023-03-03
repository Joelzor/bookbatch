import { Stack } from "react-bootstrap";
import { useBatchContext } from "../context/batch";

const CreatePost = () => {
  const { setLocalPost } = useBatchContext();

  return (
    <Stack className="mt-4">
      <h5>Post</h5>
      <p>
        Explain the connection between your chosen books (supports markdown)
      </p>
      <textarea
        name="post"
        rows="5"
        style={{ width: "80%" }}
        onChange={(e) => setLocalPost(e.target.value)}
      />
    </Stack>
  );
};

export default CreatePost;
