import { Stack, Button } from "react-bootstrap";
import "../styles/bookResult.css";

const BookResult = ({ bookInfo }) => {
  const {
    title,
    authors,
    description,
    imageLinks: { smallThumbnail: cover },
  } = bookInfo.volumeInfo;

  return (
    <Stack gap={2} direction="horizontal" className="result">
      <img src={cover} alt={`${title} cover`} />
      <div>
        <p className="bold">{title}</p>
        <p>
          {authors.map((author, index) => {
            return <span key={index}>{author}</span>;
          })}
        </p>
        <p>{`${description.substring(0, 200)}...`}</p>
      </div>
      <Button className="add-btn">Add</Button>
    </Stack>
  );
};

export default BookResult;
