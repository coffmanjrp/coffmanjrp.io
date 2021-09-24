import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import matter from 'gray-matter';
import { STRAPI_ENDPOINT } from '@/config/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const local = fs
    .readdirSync(path.join(process.cwd(), 'contents', 'blog'))
    .filter((path) => /\.mdx?$/.test(path));

  const localData = local.map((id) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'contents', 'blog', id),
      'utf8'
    );
    const slug = id.replace(/\.mdx/, '');
    const { data } = matter(source);

    return {
      frontmatter: {
        ...data,
        slug,
      },
    };
  });

  const strapi = await fetch(`${STRAPI_ENDPOINT}/blogs`);
  const strapiApi = await strapi.json();
  const strapiData = strapiApi.map(
    (data: {
      title: string;
      published: string;
      updated: string;
      author: string;
      tags: string;
      cover: { formats: { small: { url: string } } };
      slug: string;
    }) => {
      return {
        frontmatter: {
          title: data.title,
          published: data.published,
          updated: data.updated,
          author: data.author,
          tags: data.tags,
          cover: data.cover.formats.small.url,
          slug: data.slug,
        },
      };
    }
  );

  const posts = [...localData, ...strapiData];

  const sortedPosts = posts.sort((a, b) =>
    Number(new Date(a.frontmatter.published)) <
    Number(new Date(b.frontmatter.updated))
      ? 1
      : -1
  );

  res.status(200).json({ posts: sortedPosts });
}
