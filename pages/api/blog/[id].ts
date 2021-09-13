import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  const source = fs.readFileSync(
    path.join(process.cwd(), 'pages', 'posts', 'blog', `${id}.mdx`)
  );
  const { data, content } = matter(source);
  const serializedContent = await serialize(content);

  const post = {
    content: serializedContent,
    data: {
      id: (id as string).replace(/\.mdx/, ''),
      ...data,
    },
  };

  res.status(200).json({ post });
}
