import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import qs from 'qs';
import { STRAPI_ENDPOINT } from '@/config/index';
import { generatePlaiceholder } from '@/lib/plaiceholder';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { term } = req.query;

  const q = qs.stringify({
    _where: { _or: [{ tags_contains: term }] },
  });

  const strapi = await fetch(`${STRAPI_ENDPOINT}/blogs?${q}`);
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

  const postsWithPlaiceholder = await Promise.all(
    strapiSource.map(async (post: { frontmatter: { cover: string } }) => {
      const { img, base64 } = await generatePlaiceholder(
        post.frontmatter.cover,
        '/images/placeholder.jpg'
      );

      return {
        ...post,
        plaiceholder: { img: { ...img, blurDataURL: base64 } },
      };
    })
  );

  const posts = postsWithPlaiceholder.sort((a, b) =>
    Number(new Date(a.frontmatter.published)) <
    Number(new Date(b.frontmatter.updated))
      ? 1
      : -1
  );

  res.status(200).json({ posts });
}
