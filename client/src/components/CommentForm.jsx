import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";

const CommentForm = ({ comments, setComments, batchId }) => {
  const { loggedInUser } = useGlobalContext();
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${process.env.REACT_APP_BASE_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, userId: loggedInUser.id, batchId }),
    });

    setComments([
      ...comments,
      {
        content,
        username: loggedInUser.username,
        createdAt: new Date(),
        id: Date.now(),
      },
    ]);

    setContent("");
  };

  return (
    <Form className="mb-4" onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          name="content"
          value={content}
          className="message-input"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};

export default CommentForm;
