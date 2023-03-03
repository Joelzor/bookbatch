const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createCustomError } = require("../errors/custom-error");

const getAllBooks = async (req, res) => {
  const books = await prisma.book.findMany();

  res.status(200).json(books);
};

const createBook = async (req, res, next) => {
  const { title, author, cover, year, googleId } = req.body;

  if (!title) {
    return next(createCustomError("You must provide a title", 400));
  }

  // may need the google books ID to make sure only unique books are ever persisted in DB

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

module.exports = { createBook, getAllBooks };
