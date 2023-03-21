import { Stack } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useGlobalContext } from "../context/auth";

const Comment = ({ comment, deleteComment }) => {
  const { loggedInUser } = useGlobalContext();

  console.log(comment.id);

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
      <div className="comment-row">
        <p className="comment-content">{comment.content}</p>
        {loggedInUser &&
        loggedInUser?.username ===
          (comment.User?.username || comment?.username) ? (
          <AiFillDelete
            className="comment-delete-btn"
            onClick={() => deleteComment(comment.id)}
          />
        ) : null}
      </div>
    </Stack>
  );
};

export default Comment;
