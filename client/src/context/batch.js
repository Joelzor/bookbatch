import { createContext, useContext, useState } from "react";

const BatchContext = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;

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
    // passed in book gets persisted to the database
    // take out the properties I want
    // send a POST request to new books endpoint
    console.log(book);
  };

  const value = {
    searchBooks,
    saveBook,
    localBooks,
    setLocalBooks,
  };

  return (
    <BatchContext.Provider value={value}>{children}</BatchContext.Provider>
  );
};

const useBatchContext = () => {
  return useContext(BatchContext);
};

export { BatchProvider, useBatchContext };
