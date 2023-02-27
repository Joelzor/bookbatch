const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllBatches = async (req, res) => {
  const batches = await prisma.batch.findMany({
    include: {
      books: true,
      tags: true,
      posts: true,
      User: true,
    },
  });

  res.status(200).json(batches);
};

module.exports = { getAllBatches };
