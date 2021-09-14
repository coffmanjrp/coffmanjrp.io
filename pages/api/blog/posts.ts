import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const files = fs.readdirSync(path.join(process.cwd(), 'data', 'blog'));

  const posts = files
    .reduce((posts, id) => {
      const source = fs.readFileSync(
        path.join(process.cwd(), 'data', 'blog', id),
        'utf8'
      );
      const { data } = matter(source);

      return [
        {
          frontmatter: {
            ...data,
            id: id.replace(/\.mdx/, ''),
          },
        },
        ...posts,
      ];
    }, [])
    .sort((a: number, b: number) =>
      Number(new Date(a.frontmatter.date)) <
      Number(new Date(b.frontmatter.date))
        ? 1
        : -1
    );

  res.status(200).json({ posts });
}
