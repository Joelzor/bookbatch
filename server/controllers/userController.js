const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
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

const deleteUser = async (req, res, next) => {
  const id = Number(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return next(createCustomError(`Cannot find user with ID ${id}`, 404));
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });

  res.status(200).json({ status: "success" });
};

const updateUserProfile = async (req, res, next) => {
  const id = Number(req.params.id);
  const { firstName, lastName, bio, profileImg } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    return next(createCustomError(`Cannot find user with ID ${id}`, 404));
  }

  if (!user.profile) {
    const updatedUser = await prisma.profile.create({
      data: {
        firstName,
        lastName,
        bio,
        profileImg,
        user: {
          connect: {
            id,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return res.status(201).json(updatedUser);
  }

  const updatedUser = await prisma.profile.update({
    where: {
      id: user.profile.id,
    },
    data: {
      firstName,
      lastName,
      bio,
      profileImg,
    },
    include: {
      user: true,
    },
  });

  res.status(200).json(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUserProfile,
};
