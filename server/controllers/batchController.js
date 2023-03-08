const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createCustomError } = require("../errors/custom-error");
const axios = require("axios");

const tagsControl = (tags) => {
  const tagArr = [];
  if (tags) {
    tags.forEach((tag) => {
      tagArr.push({
        where: {
          title: tag.label || tag.title,
        },
        create: {
          title: tag.label || tag.title,
        },
      });
    });
  }

  return tagArr;
};

const booksControl = (books) => {
  const bookArr = [];
  if (books) {
    books.forEach((book) => {
      bookArr.push({
        where: {
          googleId: book.googleId,
        },
        create: {
          title: book.title,
          author: book.author,
          cover: book.cover,
          googleId: book.googleId,
          yearPublished: book.yearPublished,
          pageCount: book.pageCount,
        },
      });
    });
  }

  return bookArr;
};

const getAllBatches = async (req, res) => {
  let { published } = req.query;
  published = published === "true" ? true : false;

  const batches = await prisma.batch.findMany({
    where: {
      published,
    },
    include: {
      books: true,
      tags: true,
      post: true,
      user: true,
    },
  });

  batches.forEach((batch) => {
    delete batch.user.password;
  });

  res.status(200).json(batches);
};

const getBatchById = async (req, res, next) => {
  const id = Number(req.params.id);

  const batch = await getBatchData(id);

  if (!batch) {
    return next(createCustomError(`Cannot find batch with ID ${id}`, 404));
  }

  const newBooksPromise = batch.books.map(async (book) => {
    const fetchedBook = await axios(
      `https://www.googleapis.com/books/v1/volumes/${book.googleId}?key=${process.env.API_KEY}`
    );
    book.googleData = fetchedBook.data;
    return book;
  });

  const newBooks = await Promise.all(newBooksPromise);

  batch.books = newBooks;

  res.status(200).json(batch);
};

const getBatchData = async (id) => {
  const batch = await prisma.batch.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
      tags: true,
      post: {
        include: {
          comments: true,
        },
      },
      user: true,
    },
  });

  if (!batch) {
    return null;
  }

  delete batch.user.password;

  return batch;
};

const getBatchesByUser = async (req, res, next) => {
  const id = Number(req.params.id);

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return next(createCustomError(`Cannot find user with ID ${id}`, 404));
  }

  const batches = await prisma.batch.findMany({
    where: {
      userId: id,
    },
    include: {
      books: true,
      tags: true,
      post: true,
      user: true,
    },
  });

  res.status(200).json(batches);
};

const createBatch = async (req, res, next) => {
  const { title, published, books, tags, post } = req.body;

  if (!books) {
    return next(createCustomError("A batch must include some books!", 400));
  }

  const tagArr = tagsControl(tags);
  const bookArr = booksControl(books);

  const newBatch = await prisma.batch.create({
    data: {
      title,
      published,
      post: {
        create: {
          body: post,
        },
      },
      user: {
        connect: {
          id: req.user.id,
        },
      },
      tags: {
        connectOrCreate: tagArr,
      },
      books: {
        connectOrCreate: bookArr,
      },
    },
    include: {
      books: true,
      tags: true,
      post: true,
      user: true,
    },
  });

  res.status(201).json(newBatch);
};

const deleteBatch = async (req, res, next) => {
  const id = Number(req.params.id);

  const batch = await prisma.batch.findUnique({
    where: { id },
  });

  if (!batch) {
    return next(createCustomError(`There is no batch with id ${id}`, 404));
  }

  const deletedBatch = await prisma.batch.delete({
    where: { id },
  });

  res.status(200).json({ message: "success", deletedBatch });
};

const updateBatch = async (req, res, next) => {
  const id = Number(req.params.id);
  const { title, published, books, tags, post } = req.body;

  const batch = await prisma.batch.findUnique({
    where: { id },
  });

  if (!batch) {
    return next(createCustomError(`There is no batch with id ${id}`, 404));
  }

  const tagArr = tagsControl(tags);
  const bookArr = booksControl(books);
  4;

  const updatedBatch = await prisma.batch.update({
    where: {
      id,
    },
    data: {
      title,
      published,
      post: {
        update: {
          body: post,
        },
      },
      books: {
        connectOrCreate: bookArr,
      },
      tags: {
        connectOrCreate: tagArr,
      },
    },
    include: {
      post: true,
      books: true,
      tags: true,
    },
  });

  res.status(201).json(updatedBatch);
};

module.exports = {
  getAllBatches,
  createBatch,
  getBatchById,
  getBatchesByUser,
  deleteBatch,
  updateBatch,
};
