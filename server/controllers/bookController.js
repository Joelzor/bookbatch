const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createCustomError } = require("../errors/custom-error");
const axios = require("axios");

const getAllBooks = async (req, res) => {
  const books = await prisma.book.findMany();

  res.status(200).json(books);
};

const createBook = async (req, res, next) => {
  const { title, author, cover, year, googleId } = req.body;

  if (!title) {
    return next(createCustomError("You must provide a title", 400));
  }

  const newBook = await prisma.book.create({
    data: {
      title,
      author,
      cover,
      year,
      googleId,
    },
  });

  res.status(201).json({ message: "success", newBook });
};

const searchBooks = async (req, res, next) => {
  const { query } = req.body;

  if (!query) {
    return next(createCustomError("You must provide a search query", 400));
  }

  const data = await axios(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.API_KEY}`
  );

  const curatedBooks = data.data.items.map((book) => {
    const {
      title,
      authors,
      imageLinks,
      publishedDate,
      pageCount,
      description,
    } = book.volumeInfo;
    const yearPublished = new Date(publishedDate).getFullYear();
    const { id } = book;

    let authorString;

    if (!authors) {
      authorString = "No author information";
    } else {
      authorString = authors.join(" & ") || null;
    }

    return {
      title,
      author: authorString,
      cover: imageLinks?.smallThumbnail || null,
      googleId: id,
      yearPublished: yearPublished.toString() || null,
      pageCount: pageCount || null,
      description: description || null,
    };
  });

  res.status(200).json(curatedBooks);
};

module.exports = { createBook, getAllBooks, searchBooks };
