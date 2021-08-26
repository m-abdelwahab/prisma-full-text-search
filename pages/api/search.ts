import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query.q;
  try {
    const results = await prisma.post.findMany({
      where: {
        body: {
          search: `${query}`,
        },
      },
    });
    console.log(results);
    res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    res.status(400).json({ results: [], message: error });
  }
}
