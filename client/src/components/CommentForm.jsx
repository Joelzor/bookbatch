import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CommentForm = () => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(content);
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
