// run - npx prisma db seed

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  await prisma.user.deleteMany();
  await prisma.book.deleteMany();
  await prisma.batch.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.comment.deleteMany();

  const joel = await prisma.user.create({
    data: {
      username: "Joelzor",
      email: "joel@gmail.com",
      password: "Testpassword1!",
      profile: {
        create: {
          firstName: "Joel",
          lastName: "Watkins",
          bio: "esteemed creator of Bookbatch",
        },
      },
    },
    include: { profile: true },
  });

  // const book1 = await prisma.book.create({
  //   data: {
  //     title: "The Magic Mountain",
  //     author: "Thomas Mann",
  //     year: "1924",
  //   },
  // });

  // const book2 = await prisma.book.create({
  //   data: {
  //     title: "Buddenbrooks",
  //     author: "Thomas Mann",
  //     year: "1901",
  //   },
  // });

  // const book3 = await prisma.book.create({
  //   data: {
  //     title: "Doctor Faustus",
  //     author: "Thomas Mann",
  //     year: "1947",
  //   },
  // });

  // const tag1 = await prisma.tag.create({
  //   data: {
  //     title: "author intro",
  //   },
  // });

  // const batch = await prisma.batch.create({
  //   data: {
  //     title: "Thomas Mann introduction",
  //     userId: joel.id,
  //     books: {
  //       connect: [{ id: book1.id, id: book2.id, id: book3.id }],
  //     },
  //     tags: {
  //       connect: { id: tag1.id },
  //     },
  //   },
  //   include: {
  //     books: true,
  //     tags: true,
  //   },
  // });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
