import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
// @ts-ignore
import mdxPrism from 'mdx-prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { STRAPI_ENDPOINT } from '@/config/index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  const strapi = await fetch(`${STRAPI_ENDPOINT}/blogs?slug=${slug}`);
  const strapiData = await strapi.json();
  const strapiSource = strapiData.map(
    (data: {
      markdown: string;
      title: string;
      published: string;
      updated: string;
      user: {
        username: string;
        portrait: {
          formats: {
            thumbnail: {
              url: string;
            };
          };
        };
      };
      tags: string;
      cover: { url: string };
    }) => {
      return {
        content: data.markdown,
        data: {
          title: data.title,
          published: data.published,
          updated: data.updated,
          author: {
            name: data.user.username,
            portrait: data.user.portrait.formats.thumbnail.url,
          },
          tags: data.tags,
          cover: data.cover.url,
        },
      };
    }
  );
  const { data, content } = strapiSource[0];

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
      slug,
      ...data,
    },
  };

  res.status(200).json({ post });
}
