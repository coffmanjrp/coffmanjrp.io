import fs from 'fs';
import path from 'path';
import { useRef } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { parseISO, format } from 'date-fns';
import { slug } from 'github-slugger';
import { getPlaiceholder } from 'plaiceholder';
import { Layout, MDXComponents } from '@/components/index';
import useSyntaxTree from '@/hooks/useSyntaxTree';

type Props = {
  source: {
    compiledSource: string;
    scope: {};
  };
  frontmatter: {
    id: string;
    title: string;
    published: string;
    updated?: string;
    author: string;
    tags?: string;
  };
  plaiceholder: {
    img: { src: string; width: number; height: number; type: string };
    base64: string;
  };
};

const BlogPostPage: NextPage<Props> = ({
  frontmatter,
  source,
  plaiceholder,
}) => {
  const root = useRef();
  const { title, published, updated, author, tags } = frontmatter;
  const { base64, img } = plaiceholder;
  const tagArray = tags?.split(' ');
  const titleSlug = slug(title);
  const syntaxTree = useSyntaxTree(root, title);

  return (
    <Layout toc={syntaxTree}>
      <article className="w-full max-w-screen-md mx-auto">
        <div className="flex flex-col w-full">
          <h1 id={titleSlug} className="text-5xl font-bold mb-8 text-center">
            {title}
          </h1>
          {img && (
            <Image
              {...img}
              alt={title}
              placeholder="blur"
              blurDataURL={base64}
            />
          )}
          <div className="inline-flex mt-8 mb-4">
            {tagArray &&
              tagArray.map((tag, index) => (
                <Link key={index} href={`/blog/${tag}`}>
                  <a className="inline-block bg-gray-200 dark:bg-gray-500 px-1 rounded-md mr-1 text-sm leading-5 no-underline select-none text-gray-600 dark:text-gray-50">
                    # {tag}
                  </a>
                </Link>
              ))}
          </div>
          <div className="flex justify-between md:items-center flex-col md:flex-row mt-2 w-full mb-4">
            <div className="flex items-center">
              <div className="relative inline-flex items-center justify-center flex-shrink-0 gap-2">
                <Image
                  src="/images/portrait.png"
                  alt="author"
                  width={60}
                  height={60}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="text-sm">
                  <p>
                    Written By <span className="font-bold">{author}</span>
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
  const posts = fs.readdirSync(path.join(process.cwd(), 'contents', 'blog'));
  const paths = posts.map((post) => ({
    params: {
      id: post.replace(/\.mdx/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/blog/${params?.id}`
  );
  const { post } = await res.json();

  const generatePlaiceholder = await getPlaiceholder(
    post.frontmatter.cover ? post.frontmatter.cover : '/images/placeholder.jpg'
  );
  const { img, base64 } = generatePlaiceholder;

  return {
    props: { ...post, plaiceholder: { img, base64 } },
  };
};

export default BlogPostPage;
