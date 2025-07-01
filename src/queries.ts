import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL
  }),
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
  ]
});


prisma.$on("query", (e) => {
  console.info(`Query: ${e.query}`);
  console.info(`Params: ${e.params}`);
  console.info(`Target: ${e.target}`);
});

async function main() {
  const user1Email1 = `jake${Date.now()}@prisma.example`;
  const user1Email2 = `alice${Date.now()}@prisma.example`;

  await prisma.user.create({
    data: {
      email: user1Email1,
      name: 'Jake',
      money: "999.99", // Less than 1000 works
      posts: {
        create: {
          title: 'Join the Prisma community on Discord',
          content: 'https://pris.ly/discord',
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  });

  console.log(" *** Created user 1 *** ");

  await prisma.user.create({
    data: {
      email: user1Email2,
      name: 'Alice',
      money: 1_000, // This also fails with `Decimal` and `string` values
      posts: {
        create: {
          title: 'Join the Prisma community on Discord',
          content: 'https://pris.ly/discord',
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  });

  console.log(" *** Created user 2 *** ");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
