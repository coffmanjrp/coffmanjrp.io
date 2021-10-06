import { useRef } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { parseISO, format } from 'date-fns';
// @ts-ignore
import { slug } from 'github-slugger';
import { Layout, MDXComponents, Tag } from '@/components/index';
import { BASE_URL } from '@/config/index';
import useSyntaxTree from '@/hooks/useSyntaxTree';
import { generatePlaiceholder } from '@/lib/plaiceholder';

type Props = {
  source: {
    compiledSource: string;
    scope: {};
  };
  frontmatter: {
    slug: string;
    title: string;
    published: string;
    updated?: string;
    author: { name: string; portrait: string };
    tags?: string;
  };
  plaiceholders: {
    cover: {
      src: string;
      width: number;
      height: number;
      type: string;
      blurDataURL: string;
    };
    portrait: {
      src: string;
      width: number;
      height: number;
      type: string;
      blurDataURL: string;
    };
  };
};

const BlogPostPage: NextPage<Props> = ({
  frontmatter,
  source,
  plaiceholders,
}) => {
  const root = useRef<HTMLDivElement>(null);
  const {
    title,
    published,
    updated,
    author: { name },
    tags,
  } = frontmatter;
  const { cover, portrait } = plaiceholders;
  const tagArray = tags?.trim().split(',');
  const titleSlug = slug(title);
  const syntaxTree = useSyntaxTree(root, title);
  const seo = {
    title,
    canonical: `${BASE_URL}/blog/${titleSlug}`,
    openGraph: {
      url: `${BASE_URL}/blog/${titleSlug}`,
      title,
      images: {
        url: cover.src,
        alt: title,
      },
    },
  };

  return (
    <Layout seo={seo} toc={syntaxTree}>
      <article className="w-full max-w-screen-md mx-auto">
        <div className="flex flex-col w-full">
          <h1 id={titleSlug} className="text-5xl font-bold mb-8 text-center">
            {title}
          </h1>
          {cover && <Image {...cover} alt={title} placeholder="blur" />}
          <div className="inline-flex gap-1 mt-8 mb-4">
            {tagArray?.map((tag, index) => (
              <Tag key={index} tag={tag} href={`/blog?term=${tag}`} />
            ))}
          </div>
          <div className="flex justify-between md:items-center flex-col md:flex-row mt-2 w-full mb-4">
            <div className="flex items-center">
              <div className="relative inline-flex items-center justify-center flex-shrink-0 gap-2">
                <Image
                  {...portrait}
                  alt="author"
                  className="w-full h-full object-cover rounded-full"
                  width={60}
                  height={60}
                  placeholder="blur"
                />
                <div className="text-sm">
                  <p>
                    Written By <span className="font-bold">{name}</span>
                  </p>
                  <p>
                    Published on{' '}
                    <span className="font-bold">
                      {format(parseISO(published), 'MMMM dd, yyyy')}
                    </span>
                  </p>
                  {updated && (
                    <p>
                      Updated on{' '}
                      <span className="font-bold">
                        {format(parseISO(updated), 'MMMM dd, yyyy')}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={root}
          className="markdown markdown-blue dark:markdown-dark max-w-none"
        >
          <MDXRemote {...source} components={MDXComponents} />
        </div>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${BASE_URL}/api/blog/posts`);
  const data = await res.json();
  const paths = data.posts.map((post: { frontmatter: { slug: string } }) => ({
    params: {
      slug: post.frontmatter.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${BASE_URL}/api/blog/${params?.slug}`);
  const { post } = await res.json();
  const cover = await generatePlaiceholder(
    post.frontmatter.cover,
    '/images/placeholder.jpg'
  );
  const portrait = await generatePlaiceholder(
    post.frontmatter.author.portrait,
    '/images/portrait.png'
  );

  return {
    props: {
      ...post,
      plaiceholders: {
        cover: { ...cover.img, blurDataURL: cover.base64 },
        portrait: { ...portrait.img, blurDataURL: portrait.base64 },
      },
    },
  };
};

export default BlogPostPage;
