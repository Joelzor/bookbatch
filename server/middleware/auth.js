const jwt = require("jsonwebtoken");
const { createCustomError } = require("../errors/custom-error");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return next(createCustomError("Please log in to access this route", 403));
  }

  token = token.replace("Bearer ", "");

  const verified = jwt.verify(token, secret);

  if (!verified) {
    return next(createCustomError("Access token missing or invalid", 401));
  }

  const user = await prisma.user.findFirst({
    where: {
      id: verified.id,
    },
  });

  delete user.password;

  req.user = user;

  next();
};

module.exports = { authenticate };
