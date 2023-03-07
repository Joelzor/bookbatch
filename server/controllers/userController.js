const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createCustomError } = require("../errors/custom-error");

const saltRounds = 10;

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
      profile: true,
    },
  });

  if (!user) {
    return next(createCustomError(`Cannot find user with ID ${id}`, 404));
  }

  delete user.password;

  res.status(200).json(user);
};

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(
      createCustomError("You must provide username, email and password", 400)
    );
  }

  const foundUser = await prisma.user.findFirst({ where: { email } });

  if (foundUser) {
    return next(
      createCustomError("A user with this email already exists", 400)
    );
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hash,
        },
        include: {
          profile: true,
        },
      });

      delete newUser.password;

      res.status(201).json({ status: "success", newUser });
    });
  });
};

module.exports = { getAllUsers, getUserById, createUser };
