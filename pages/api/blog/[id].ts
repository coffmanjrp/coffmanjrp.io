import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  const source = fs.readFileSync(
    path.join(process.cwd(), 'data', 'blog', `${id}.mdx`)
  );
  const { data, content } = matter(source);
  const mdxSource = await serialize(content);

  const post = {
    source: mdxSource,
    frontmatter: {
      id: (id as string).replace(/\.mdx/, ''),
      ...data,
    },
  };

  res.status(200).json({ post });
}
