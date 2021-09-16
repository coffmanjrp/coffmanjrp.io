import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const files = fs
    .readdirSync(path.join(process.cwd(), 'data', 'blog'))
    .filter((path) => /\.mdx?$/.test(path));

  const posts = files
    .map((id) => {
      const source = fs.readFileSync(
        path.join(process.cwd(), 'data', 'blog', id),
        'utf8'
      );
      const slug = id.replace(/\.mdx/, '');
      const { data } = matter(source);

      return {
        frontmatter: {
          ...data,
          id: slug,
        },
      };
    })
    .sort((a, b) =>
      Number(new Date(a.frontmatter.published)) <
      Number(new Date(b.frontmatter.published))
        ? 1
        : -1
    );

  res.status(200).json({ posts });
}
