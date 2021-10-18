import type { NextApiRequest, NextApiResponse } from 'next';
import { getArticleList } from '@/lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { term } = req.query;

  const articles = await getArticleList(term);

  res.status(200).json({ articles });
}
