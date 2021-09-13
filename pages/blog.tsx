import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { Layout } from '@/components/index';

type Props = {
  posts: {
    frontmatter: {
      title: string;
      date: string;
      id: string;
    };
  }[];
};

const BlogPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Layout>
        <main className="flex-1 w-full max-w-screen-md mx-auto py-24 md:pt-24">
          <div className="relative w-full my-8">
            <h1 className="text-5xl font-bold">Blog Posts ({posts.length})</h1>
            <p className="text-base text-gray-600 dark:text-gray-400 my-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro
              deserunt fugit, nesciunt tempore autem esse molestias in corrupti
              quo natus, illum dolore quod ea dolores accusantium animi nemo
              necessitatibus aliquam?
            </p>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  key={post.frontmatter.id}
                  href={`/blog/${post.frontmatter.id}`}
                >
                  <a className="flex flex-col border border-gray-300 dark:border-gray-50 rounded p-4 w-full">
                    <h4 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
                      {post.frontmatter.title}
                    </h4>
                    <p className="text-base text-gray-600 dark:text-gray-400 mb-4 flex-1">
                      {format(parseISO(post.frontmatter.date), 'MMMM dd, yyyy')}
                    </p>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsum, laborum.
                    </p>
                  </a>
                </Link>
              ))
            ) : (
              <h3 className="my-10">No Posts Found</h3>
            )}
          </div>
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/blog/posts`
  );
  const { posts } = await res.json();

  return {
    props: { posts },
  };
};

export default BlogPage;
