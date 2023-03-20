import { Stack } from "react-bootstrap";

const Comment = ({ comment }) => {
  return (
    <Stack className="comment" gap={3}>
      <div className="comment-title-row">
        <h6 className="comment-title">
          {comment?.username || comment.User.username}
        </h6>
        <h6 className="comment-title">
          {new Date(comment.createdAt).toLocaleDateString()}
        </h6>
      </div>
      <p>{comment.content}</p>
    </Stack>
  );
};

export default Comment;
