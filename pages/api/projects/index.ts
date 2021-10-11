import type { NextApiRequest, NextApiResponse } from 'next';
import { getProjectsList } from '@/lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projects } = await getProjectsList();

  res.status(200).json({ projects });
}
