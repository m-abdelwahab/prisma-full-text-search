import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const query = req.query.q;
  
  const results = await prisma.post.findMany({
    where: {
      body: {
        search: `${query}`,
      },
    },
  });

  res.status(200).json({ results });
}
