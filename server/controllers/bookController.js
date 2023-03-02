const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createCustomError } = require("../errors/custom-error");

const getAllBooks = async (req, res) => {
  const books = await prisma.book.findMany();

  res.status(200).json(books);
};

const createBook = async (req, res, next) => {
  const { title, author, cover, year } = req.body;
};

module.exports = { createBook, getAllBooks };
