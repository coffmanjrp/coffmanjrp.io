import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const files = fs.readdirSync(
    path.join(process.cwd(), 'pages', 'posts', 'blog')
  );

  const posts = files.reduce((posts, id) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'pages', 'posts', 'blog', id),
      'utf8'
    );
    const { data } = matter(source);

    return [
      {
        data: {
          ...data,
          id: id.replace(/\.mdx/, ''),
        },
      },
      ...posts,
    ];
  }, []);

  res.status(200).json({ posts });
}
