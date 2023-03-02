import { createContext, useContext } from "react";

const BatchContext = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;

const BatchProvider = ({ children }) => {
  const searchBooks = async (query) => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
    );

    const { items } = await res.json();

    return items;
  };

  const value = {
    searchBooks,
  };

  return (
    <BatchContext.Provider value={value}>{children}</BatchContext.Provider>
  );
};

const useBatchContext = () => {
  return useContext(BatchContext);
};

export { BatchProvider, useBatchContext };
