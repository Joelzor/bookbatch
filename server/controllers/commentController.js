const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createCustomError } = require("../errors/custom-error");

const getAllComments = async (req, res) => {
  const comments = await prisma.comment.findMany({});

  res.status(200).json(comments);
};

const getCommentsByBatchId = async (req, res, next) => {
  const batchId = Number(req.params.batchId);

  const batch = await prisma.batch.findUnique({
    where: { id: batchId },
  });

  if (!batch) {
    return next(createCustomError(`There is no batch with id ${batchId}`, 404));
  }

  const comments = await prisma.comment.findMany({
    where: { batchId },
  });

  res.status(200).json(comments);
};

const createComment = async (req, res, next) => {
  const { userId, batchId, content } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    return next(createCustomError(`Cannot find user with ID ${userId}`, 404));
  }

  const batch = await prisma.batch.findUnique({
    where: { id: batchId },
  });

  if (!batch) {
    return next(createCustomError(`There is no batch with id ${batchId}`, 404));
  }

  const newComment = await prisma.comment.create({
    data: {
      content,
      User: {
        connect: {
          id: userId,
        },
      },
      Batch: {
        connect: {
          id: batchId,
        },
      },
    },
  });

  res.status(201).json(newComment);
};

const deleteComment = async (req, res, next) => {
  const id = Number(req.params.id);

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    return next(createCustomError(`There is no comment with id ${id}`, 404));
  }

  const deletedComment = await prisma.comment.delete({
    where: { id },
  });

  res.status(200).json(deletedComment);
};

module.exports = {
  createComment,
  getAllComments,
  getCommentsByBatchId,
  deleteComment,
};
