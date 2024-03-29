import { createContext, useContext, useState } from "react";
import { useGlobalContext } from "./auth";

const BatchContext = createContext();

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
      const res = await fetch(`${baseUrl}/books/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const results = await res.json();

      return results;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLocalBook = (id) => {
    setLocalBooks((prevBooks) => {
      return prevBooks.filter((book) => book.googleId !== id);
    });
  };

  const createBatch = async (publish = true, update = false, batchId) => {
    const batch = {
      title: localTitle,
      books: localBooks,
      tags: localTags,
      post: localPost,
      published: publish,
    };

    const token = localStorage.getItem("access-token");
    if (update && batchId) {
      const res = await fetch(`${baseUrl}/batches/${batchId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(batch),
      });

      const updatedBatch = await res.json();
      return updatedBatch;
    }

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

  const getSavedBatches = async () => {
    const res = await fetch(`${baseUrl}/users/${loggedInUser.id}`);

    const data = await res.json();

    return data.saved;
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
    setLocalBooks(books);
  };

  const deleteBatch = async (batchId) => {
    const token = localStorage.getItem("access-token");

    const res = await fetch(`${baseUrl}/batches/${batchId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

  const addBatchToSaved = async (batchId) => {
    const token = localStorage.getItem("access-token");

    const res = await fetch(
      `${baseUrl}/batches/${batchId}/save/${loggedInUser.id}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    return data;
  };

  const deleteBatchFromSaved = async (batchId) => {
    const token = localStorage.getItem("access-token");

    const res = await fetch(
      `${baseUrl}/batches/${batchId}/save/${loggedInUser.id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

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
    localPost,
    setLocalPost,
    localTitle,
    setLocalTitle,
    createBatch,
    getAllBatches,
    getBatch,
    clearAll,
    getMyBatches,
    setUpBatchEdit,
    deleteBatch,
    addBatchToSaved,
    deleteBatchFromSaved,
    getSavedBatches,
  };

  return (
    <BatchContext.Provider value={value}>{children}</BatchContext.Provider>
  );
};

const useBatchContext = () => {
  return useContext(BatchContext);
};

export { BatchProvider, useBatchContext };
