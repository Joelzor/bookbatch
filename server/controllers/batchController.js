const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createCustomError } = require("../errors/custom-error");

const getAllBatches = async (req, res) => {
  const batches = await prisma.batch.findMany({
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
    return next(createCustomError(`There is no batch with id ${id}`, 404));
  }

  delete batch.user.password;

  res.status(200).json(batch);
};

const createBatch = async (req, res, next) => {
  const { title, published, books, tags, post } = req.body;

  if (!books) {
    return next(createCustomError("A batch must include some books!", 400));
  }

  const tagArr = [];
  tags.forEach((tag) => {
    tagArr.push({
      where: {
        title: tag.label,
      },
      create: {
        title: tag.label,
      },
    });
  });

  const bookArr = [];
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

module.exports = { getAllBatches, createBatch, getBatchById };
