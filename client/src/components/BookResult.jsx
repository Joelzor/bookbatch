import { Stack, Button } from "react-bootstrap";
import "../styles/bookResult.css";
import defaultImage from "../images/notfound.png";

const BookResult = ({ bookInfo }) => {
  const { title, authors, description, imageLinks } = bookInfo.volumeInfo;

  return (
    <Stack gap={2} direction="horizontal" className="result">
      <img
        src={imageLinks?.smallThumbnail || defaultImage}
        alt={`${title} cover`}
      />
      <div>
        <p className="bold">{title}</p>
        <p>
          {authors &&
            authors.map((author, index) => {
              return <span key={index}>{author}</span>;
            })}
        </p>
        <p>
          {description
            ? `${description.substring(0, 200)}...`
            : "We have no description for this book"}
        </p>
      </div>
      <Button className="add-btn">Add</Button>
    </Stack>
  );
};

export default BookResult;
