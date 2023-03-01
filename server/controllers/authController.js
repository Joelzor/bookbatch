const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createCustomError } = require("../errors/custom-error");

const secret = process.env.JWT_SECRET;

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createCustomError("Please provide an email and password", 400));
  }

  const foundUser = await prisma.user.findFirst({
    where: { email },
    include: { profile: true },
  });

  if (!foundUser) {
    return next(
      createCustomError("Either the email or password is incorrect", 400)
    );
  }

  bcrypt.compare(password, foundUser.password, (err, match) => {
    if (!match) {
      return next(
        createCustomError("Either the email or password is incorrect", 401)
      );
    }

    const token = jwt.sign({ id: foundUser.id }, secret);
    delete foundUser.password;
    res.status(200).json({ status: "success", token, user: foundUser });
  });
};

module.exports = { userLogin };
