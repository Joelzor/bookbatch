import { Stack, Button } from "react-bootstrap";
import { useBatchContext } from "../context/batch";
import "../styles/bookResult.css";
import defaultImage from "../images/notfound.png";

const BookResult = ({ bookInfo, handleClose }) => {
  const { localBooks, setLocalBooks } = useBatchContext();
  const { title, author, description, cover } = bookInfo;

  console.log(bookInfo);

  const addToBatch = (bookInfo) => {
    const alreadyAdded = localBooks.find(
      (book) => book.googleId === bookInfo.googleId
    );
    if (alreadyAdded) return;
    setLocalBooks([...localBooks, bookInfo]);
    handleClose();
  };

  return (
    <Stack gap={2} direction="horizontal" className="result">
      <img
        src={cover || defaultImage}
        alt={`${title} cover`}
        className="result-image"
      />
      <div className="text-container">
        <p className="bold">{title}</p>
        <p>{author}</p>
        <p>
          {description
            ? `${description.substring(0, 200)}...`
            : "We have no description for this book"}
        </p>
      </div>
      <Button className="add-btn" onClick={() => addToBatch(bookInfo)}>
        Add
      </Button>
    </Stack>
  );
};

export default BookResult;
