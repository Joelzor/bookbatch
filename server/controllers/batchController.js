const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createCustomError } = require("../errors/custom-error");

const getAllBatches = async (req, res) => {
  const batches = await prisma.batch.findMany({
    include: {
      books: true,
      tags: true,
      posts: true,
      user: true,
    },
  });

  res.status(200).json(batches);
};

const createBatch = async (req, res, next) => {
  const { title, published, books, tags, post } = req.body;

  console.log(req.body);

  if (!books) {
    return next(createCustomError("A batch must include some books!", 400));
  }

  const newBatch = await prisma.batch.create({
    data: {
      title,
      published,
      user: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });

  res.status(201).json({ msg: "success" });
};

module.exports = { getAllBatches, createBatch };
