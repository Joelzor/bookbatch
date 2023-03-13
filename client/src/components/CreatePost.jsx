import { Stack } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import { AiFillFileText } from "react-icons/ai";
import "../styles/batch.css";

const CreatePost = () => {
  const { localPost, setLocalPost } = useBatchContext();

  return (
    <Stack className="mt-4">
      <h5 className="create-heading">
        <AiFillFileText className="create-icon" />
        Post
      </h5>
      <p>
        Explain the connection between your chosen books (supports markdown)
      </p>
      <textarea
        name="post"
        rows="20"
        className="post-container"
        value={localPost}
        onChange={(e) => setLocalPost(e.target.value)}
      />
    </Stack>
  );
};

export default CreatePost;
