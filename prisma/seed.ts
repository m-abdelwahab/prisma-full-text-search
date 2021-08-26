import { prisma } from '../lib/prisma';
import { Post } from '.prisma/client';

const posts: Post[] = [
  {
    id: 1,
    title: 'First post',
    body: 'This is the first post of this awesome blog! You can do full-text-search using Prisma',
    status: 'Live',
  },
  {
    id: 2,
    title: 'Second post',
    body: 'This is the second post of this awesome blog! You can do full-text-search using Prisma',
    status: 'Live',
  },
  {
    id: 3,
    title: 'Third post',
    body: 'This demo is built using Next.js, tailwindcss and react-query',
    status: 'Live',
  },
];
async function main() {
  await prisma.post.createMany({
    data: posts,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
