import type { NextApiRequest, NextApiResponse } from 'next';
import { STRAPI_ENDPOINT } from '@/config/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const strapi = await fetch(`${STRAPI_ENDPOINT}/blogs`);
  const strapiData = await strapi.json();
  const strapiSource = strapiData.map(
    (data: {
      title: string;
      published: string;
      updated: string;
      user: {
        username: string;
        portrait: {
          url: string;
        };
      };
      tags: string;
      cover: { formats: { small: { url: string } } };
      slug: string;
    }) => {
      return {
        frontmatter: {
          title: data.title,
          published: data.published,
          updated: data.updated,
          author: {
            name: data.user.username,
            portrait: data.user.portrait.url,
          },
          tags: data.tags,
          cover: data.cover.formats.small.url,
          slug: data.slug,
        },
      };
    }
  );

  const posts = strapiSource.sort(
    (
      a: { frontmatter: { published: number } },
      b: { frontmatter: { updated: number } }
    ) =>
      Number(new Date(a.frontmatter.published)) <
      Number(new Date(b.frontmatter.updated))
        ? 1
        : -1
  );

  res.status(200).json({ posts });
}
