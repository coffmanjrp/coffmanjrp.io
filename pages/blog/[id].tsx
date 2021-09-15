import fs from 'fs';
import path from 'path';
import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { parseISO, format } from 'date-fns';
import { Layout, MDXComponents } from '@/components/index';
import { ApplyAnchorLinks } from '@/components/MDXComponents/CustomMDX';

type Props = {
  source: {
    compiledSource: string;
    scope: {};
  };
  frontmatter: {
    id: string;
    title: string;
    date: string;
  };
};

const BlogPostPage: NextPage<Props> = ({ frontmatter, source }) => {
  return (
    <Layout>
      <main className="flex-1 w-full max-w-screen-md mx-auto py-24 md:pt-24">
        <div className="flex flex-col w-full">
          <h1 className="text-5xl font-bold mb-2">{frontmatter.title}</h1>
          <div className="flex justify-between md:items-center flex-col md:flex-row mt-2 w-full mb-4">
            <div className="flex items-center">
              <span className="relative inline-flex items-center justify-center text-center  flex-shrink-0 gap-2">
                <Image
                  src="/images/portrait.png"
                  alt="author"
                  width={24}
                  height={24}
                  className="w-full h-full object-cover rounded-full"
                />
                <p>{format(parseISO(frontmatter.date), 'MMMM dd, yyyy')}</p>
              </span>
            </div>
          </div>
        </div>
        <div className="markdown markdown-blue dark:markdown-dark max-w-none">
          <ApplyAnchorLinks>
            <MDXRemote {...source} components={MDXComponents} />
          </ApplyAnchorLinks>
        </div>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = fs.readdirSync(path.join(process.cwd(), 'data', 'blog'));
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

  return {
    props: { ...post },
  };
};

export default BlogPostPage;
