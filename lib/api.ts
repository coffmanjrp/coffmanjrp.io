import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
// @ts-ignore
import mdxPrism from 'mdx-prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { STRAPI_ENDPOINT } from '@/config/index';
import { generatePlaiceholder } from '@/lib/plaiceholder';

export const fetchAPI = async (query: string, { variables }: any = {}) => {
  try {
    const res = await fetch(`${STRAPI_ENDPOINT}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch API');
  }
};

type GetBlogPostsListFrontmatters = {
  id: number;
  title: string;
  slug: string;
  published: string;
  updated: string;
  user: {
    id: number;
    username: string;
    portrait: {
      id: number;
      url: string;
    };
  };
  tags: string;
  cover: {
    id: number;
    url: string;
  };
};

type GetBlogPostsListSortedPosts = {
  frontmatter: {
    published: number;
    updated: number;
  };
};

export const getBlogPostsList = async (term?: string | string[]) => {
  const query = await fetchAPI(
    `query($where: JSON) {
      blogs(where: $where) {
        id
        title
        slug
        published
        updated
        tags
        user {
          id
          username
          portrait {
            id
            url
          }
        }
        cover {
          id
          url
        }
      },
    }`,
    { variables: { where: { tags_contains: term } } }
  );
  const { blogs } = query;

  const frontmatters = await blogs.map((data: GetBlogPostsListFrontmatters) => {
    return {
      frontmatter: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        published: data.published,
        updated: data.updated,
        author: {
          id: data.user.id,
          name: data.user.username,
          portrait: {
            id: data.user.portrait.id,
            url: data.user.portrait.url,
          },
        },
        tags: data.tags,
        cover: {
          id: data.cover.id,
          url: data.cover.url,
        },
      },
    };
  });

  const frontmattersWithPlaiceholders = await Promise.all(
    frontmatters.map(
      async (data: { frontmatter: { cover: { url: string } } }) => {
        const { img, base64 } = await generatePlaiceholder(
          data.frontmatter.cover.url,
          '/images/placeholder.jpg'
        );

        return {
          ...data,
          plaiceholder: { img: { ...img, blurDataURL: base64 } },
        };
      }
    )
  );

  const posts = frontmattersWithPlaiceholders.sort((a, b) =>
    Number(new Date((a as GetBlogPostsListSortedPosts).frontmatter.published)) <
    Number(new Date((b as GetBlogPostsListSortedPosts).frontmatter.updated))
      ? 1
      : -1
  );

  return posts;
};

export const getAllBlogPostsSlug = async () => {
  const query = await fetchAPI(
    `query {
      blogs {
        slug
      },
    }`
  );

  return query;
};

type GetBlogPostSource = {
  markdown: string;
  title: string;
  published: string;
  updated: string;
  user: {
    id: number;
    username: string;
    portrait: {
      id: number;
      url: string;
    };
  };
  tags: string;
  cover: { id: number; url: string };
};

export const getBlogPost = async (slug?: string | string[]) => {
  const query = await fetchAPI(
    `query($where: JSON) {
      blogs(where: $where) {
        title
        markdown
        published
        updated
        tags
        user {
          id
          username
          portrait {
            id
            url
          }
        }
        cover {
          id
          url
        }
      },
    }`,
    { variables: { where: { slug } } }
  );
  const { blogs } = query;

  const source = blogs.map((data: GetBlogPostSource) => {
    return {
      content: data.markdown,
      data: {
        title: data.title,
        published: data.published,
        updated: data.updated,
        author: {
          name: data.user.username,
          portrait: data.user.portrait.url,
        },
        tags: data.tags,
        cover: data.cover.url,
      },
    };
  });
  const { data, content } = source[0];

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

  const cover = await generatePlaiceholder(
    data.cover,
    '/images/placeholder.jpg'
  );

  const portrait = await generatePlaiceholder(
    data.author.portrait,
    '/images/portrait.png'
  );

  const post = {
    source: mdxSource,
    frontmatter: {
      slug,
      ...data,
    },
    plaiceholders: {
      cover: { ...cover.img, blurDataURL: cover.base64 },
      portrait: { ...portrait.img, blurDataURL: portrait.base64 },
    },
  };

  return post;
};

type GetProjectsListFrontmatters = {
  id: number;
  title: string;
  slug: string;
  links: string;
  tags: string;
  cover: { id: number; url: string };
};

export const getProjectsList = async (term?: string | string[]) => {
  const query = await fetchAPI(
    `query($where: JSON) {
      projects(where: $where, sort: "title:asc") {
        id
        title
        slug
        tags
        links
        cover {
          id
          url
        }
      },
    }`,
    { variables: { where: { tags_contains: term } } }
  );
  const { projects } = query;

  const frontmatters = await projects.map(
    (data: GetProjectsListFrontmatters) => {
      return {
        frontmatter: {
          id: data.id,
          title: data.title,
          slug: data.slug,
          tags: data.tags,
          links: data.links,
          cover: {
            id: data.cover.id,
            url: data.cover.url,
          },
        },
      };
    }
  );

  const posts = await Promise.all(
    frontmatters.map(
      async (data: { frontmatter: { cover: { url: string } } }) => {
        const { img, base64 } = await generatePlaiceholder(
          data.frontmatter.cover.url,
          '/images/placeholder.jpg'
        );

        return {
          ...data,
          plaiceholder: { img: { ...img, blurDataURL: base64 } },
        };
      }
    )
  );

  return posts;
};
