import fs from 'fs';
import path from 'path';
import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { Layout } from '@/components/index';

type Props = {
  post: {
    content: {
      compiledSource: string;
      scope: {};
    };
    data: {
      id: string;
      title: string;
      date: string;
    };
  };
};

const BlogPostPage: NextPage<Props> = ({ post }) => {
  const { data, content } = post;

  return (
    <Layout>
      <main className=" flex-1 w-full max-w-screen-md mx-auto py-24 md:pt-24">
        <article className="prose prose-blue max-w-none">
          <MDXRemote {...content} />
        </article>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = fs.readdirSync(
    path.join(process.cwd(), 'pages', 'posts', 'blog')
  );
  const post = posts.map((post) => ({
    params: {
      id: post.replace(/\.mdx/, ''),
    },
  }));

  return {
    paths: post,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/blog/${id}`
  );
  const { post } = await res.json();

  return {
    props: { post },
  };
};

export default BlogPostPage;
