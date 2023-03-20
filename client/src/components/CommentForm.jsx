import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useGlobalContext } from "../context/auth";

const CommentForm = ({ comments, setComments }) => {
  const { loggedInUser } = useGlobalContext();
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setComments([
      ...comments,
      {
        content,
        username: loggedInUser.username,
        createdAt: new Date(),
      },
    ]);
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
