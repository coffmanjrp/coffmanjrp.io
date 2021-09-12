import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const files = fs.readdirSync(
    path.join(process.cwd(), 'pages', 'posts', 'blog')
  );

  const blogPosts = files.reduce((posts, id) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'pages', 'posts', 'blog', id),
      'utf8'
    );
    const { data, content } = matter(source);

    return [
      {
        content,
        data: {
          ...data,
          id: id.replace(/\.mdx/, ''),
        },
      },
      ...posts,
    ];
  }, []);

  res.status(200).json({ blogPosts });
}
