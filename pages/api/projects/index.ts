import type { NextApiRequest, NextApiResponse } from 'next';
import { getProjectsList } from '@/lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { term } = req.query;

  const projects = await getProjectsList(term);

  res.status(200).json({ projects });
}
