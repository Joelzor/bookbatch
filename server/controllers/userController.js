const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createCustomError } = require("../errors/custom-error");

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
};

const getUserById = async (req, res, next) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      batches: true,
    },
  });

  if (!user) {
    return next(createCustomError(`Cannot find user with ID ${id}`, 404));
  }

  res.status(200).json(user);
};

module.exports = { getAllUsers, getUserById };
