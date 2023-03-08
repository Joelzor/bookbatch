import { createContext, useContext, useState, useEffect } from "react";
import { useGlobalContext } from "./auth";

const BatchContext = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const BatchProvider = ({ children }) => {
  const [localBooks, setLocalBooks] = useState([]);
  const [localTags, setLocalTags] = useState([]);
  const [localPost, setLocalPost] = useState("");
  const [localTitle, setLocalTitle] = useState("My batch");
  const { loggedInUser } = useGlobalContext();

  const getAllBatches = async () => {
    const res = await fetch(`${baseUrl}/batches?published=true`);
    const data = await res.json();

    return data;
  };

  const searchBooks = async (query) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
      );

      const { items } = await res.json();

      return items;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLocalBook = (id) => {
    setLocalBooks((prevBooks) => {
      return prevBooks.filter((book) => book.id !== id);
    });
  };

  const createBatch = async (publish = true) => {
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
      published: publish,
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
    return newBatch;
  };

  const getBatch = async (id) => {
    const res = await fetch(`${baseUrl}/batches/${id}`);
    const data = await res.json();
    return data;
  };

  const getMyBatches = async () => {
    const res = await fetch(`${baseUrl}/batches/user/${loggedInUser.id}`);
    const data = await res.json();
    return data;
  };

  const clearAll = () => {
    setLocalBooks([]);
    setLocalTags([]);
    setLocalPost("");
    setLocalTitle("My batch");
  };

  const setUpBatchEdit = async (batchId) => {
    const batch = await getBatch(batchId);
    const { title, books, post, tags } = batch;
    setLocalTitle(title);
    setLocalPost(post.body);
    setLocalTags(tags);
    // const booksToEdit = [];

    // console.log("checking batch", batch);
    // necessary to fetch the full book data from google API for original create code to work
    // books.forEach(async (book) => {
    //   const response = await fetch(
    //     `https://www.googleapis.com/books/v1/volumes/${book.googleId}?key=${API_KEY}`
    //   );
    //   const fetchedBook = await response.json();
    //   booksToEdit.push(fetchedBook);
    // });

    setLocalBooks(books);
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
    getAllBatches,
    getBatch,
    clearAll,
    getMyBatches,
    setUpBatchEdit,
  };

  return (
    <BatchContext.Provider value={value}>{children}</BatchContext.Provider>
  );
};

const useBatchContext = () => {
  return useContext(BatchContext);
};

export { BatchProvider, useBatchContext };
