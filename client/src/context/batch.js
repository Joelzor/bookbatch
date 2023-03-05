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

  const deleteLocalBook = (id) => {
    setLocalBooks((prevBooks) => {
      return prevBooks.filter((book) => book.id !== id);
    });
  };

  const createBatch = async () => {
    const curatedBooks = localBooks.map((book) => {
      const { title, authors, imageLinks, publishedDate, pageCount } =
        book.volumeInfo;
      const yearPublished = new Date(publishedDate).getFullYear();
      const { id } = book;
      return {
        title,
        author: authors.join(" & ") || null,
        cover: imageLinks?.smallThumbnail || null,
        googleId: id,
        yearPublished: yearPublished.toString() || null,
        pageCount: pageCount || null,
      };
    });

    const batch = {
      title: localTitle,
      books: curatedBooks,
      tags: localTags,
      post: localPost,
      published: true,
    };

    const token = localStorage.getItem("access-token");

    const res = await fetch(`${baseUrl}/batches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(batch),
    });

    const newBatch = await res.json();
    setBatches([...batches, newBatch]);
  };

  const getBatch = async (id) => {
    const res = await fetch(`${baseUrl}/batches/${id}`);
    const data = await res.json();
    return data;
  };

  const value = {
    searchBooks,
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
    getBatch,
  };

  return (
    <BatchContext.Provider value={value}>{children}</BatchContext.Provider>
  );
};

const useBatchContext = () => {
  return useContext(BatchContext);
};

export { BatchProvider, useBatchContext };
