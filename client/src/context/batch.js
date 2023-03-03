import { createContext, useContext, useState } from "react";

const BatchContext = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const BatchProvider = ({ children }) => {
  const [localBooks, setLocalBooks] = useState([]);

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

  const value = {
    searchBooks,
    saveBook,
    localBooks,
    setLocalBooks,
    deleteLocalBook,
  };

  return (
    <BatchContext.Provider value={value}>{children}</BatchContext.Provider>
  );
};

const useBatchContext = () => {
  return useContext(BatchContext);
};

export { BatchProvider, useBatchContext };
