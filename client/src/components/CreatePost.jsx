import { Stack } from "react-bootstrap";

const CreatePost = () => {
  return (
    <Stack className="mt-4">
      <h5>Post</h5>
      <p>
        Explain the connection between your chosen books (supports markdown)
      </p>
      <textarea name="post" rows="5" style={{ width: "80%" }} />
    </Stack>
  );
};

export default CreatePost;
