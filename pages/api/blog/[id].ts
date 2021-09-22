import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import mdxPrism from 'mdx-prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  const source = fs.readFileSync(
    path.join(process.cwd(), 'contents', 'blog', `${id}.mdx`)
  );
  const { data, content } = matter(source);

  const slug = (id as string).replace(/\.mdx/, '');
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkUnwrapImages],
      rehypePlugins: [
        mdxPrism,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'wrap',
            properties: { className: ['anchor-tag'] },
          },
        ],
      ],
    },
  });

  const post = {
    source: mdxSource,
    frontmatter: {
      id: slug,
      ...data,
    },
  };

  res.status(200).json({ post });
}
