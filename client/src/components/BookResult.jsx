const BookResult = ({ bookInfo }) => {
  const {
    title,
    authors,
    description,
    imageLinks: { smallThumbnail: cover },
  } = bookInfo.volumeInfo;

  return (
    <article>
      <img src={cover} alt={`${title} cover`} />
      <div>
        <p>{title}</p>
        <p>{authors}</p>
        <p>{description}</p>
      </div>
    </article>
  );
};

export default BookResult;
