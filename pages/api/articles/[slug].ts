import type { NextApiRequest, NextApiResponse } from 'next';
import { getArticle } from '@/lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  const post = await getArticle(slug);

  res.status(200).json({ post });
}
