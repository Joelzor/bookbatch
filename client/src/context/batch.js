import { createContext, useContext, useState } from "react";

const BatchContext = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const BatchProvider = ({ children }) => {
  const [batches, setBatches] = useState([]);
  const [localBooks, setLocalBooks] = useState([]);
  const [localTags, setLocalTags] = useState([]);
  const [localPost, setLocalPost] = useState("");
  const [localTitle, setLocalTitle] = useState("My batch");

  const searchBooks = async (query) => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
    );

    const { items } = await res.json();

    return items;
  };

  const saveBook = async (book) => {
    const { title, authors, imageLinks } = book.volumeInfo;

    const payload = {
      title,
      author: authors.join(" & "),
      cover: imageLinks?.smallThumbnail || null,
    };

    await fetch(`${baseUrl}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  const deleteLocalBook = (id) => {
    setLocalBooks((prevBooks) => {
      return prevBooks.filter((book) => book.id !== id);
    });
  };

  const createBatch = () => {
    const batch = {
      title: localTitle,
      books: localBooks,
      tags: localTags,
      post: localPost,
    };

    console.log(batch);
  };

  const value = {
    searchBooks,
    saveBook,
    localBooks,
    setLocalBooks,
    deleteLocalBook,
    localTags,
    setLocalTags,
    setLocalPost,
    localTitle,
    setLocalTitle,
    createBatch,
    batches,
  };

  return (
    <BatchContext.Provider value={value}>{children}</BatchContext.Provider>
  );
};

const useBatchContext = () => {
  return useContext(BatchContext);
};

export { BatchProvider, useBatchContext };
