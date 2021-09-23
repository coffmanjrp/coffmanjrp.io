import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import { Layout } from '@/components/index';
import { generatePlaiceholder } from '@/lib/plaiceholder';

type Props = {
  posts: {
    frontmatter: {
      id: string;
      title: string;
      published: string;
      updated?: string;
      author: string;
      tags?: string;
      cover: string;
    };
    plaiceholder: {
      img: { src: string; width: number; height: number; type: string };
      base64: string;
    };
  }[];
};

const BlogPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Layout>
        <main className="w-full max-w-screen-md mx-auto">
          <div className="relative w-full mb-8">
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
              posts.map(
                ({
                  frontmatter: { id, title, updated, published },
                  plaiceholder: { img, base64 },
                }) => (
                  <Link key={id} href={`/blog/${id}`}>
                    <a className="flex flex-col border border-gray-300 dark:border-gray-50 rounded p-4 w-full">
                      <div className="flex-1">
                        <Image
                          {...img}
                          alt={title}
                          placeholder="blur"
                          blurDataURL={base64}
                        />
                      </div>
                      <h4 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
                        {title}
                      </h4>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        {updated ? (
                          <>
                            {format(parseISO(updated), 'MMMM dd, yyyy')}{' '}
                            <span className="inline-block px-1 py-0.5 bg-yellow-500 rounded text-xs text-gray-50">
                              ❗ Updated
                            </span>
                          </>
                        ) : (
                          format(parseISO(published), 'MMMM dd, yyyy')
                        )}
                      </p>
                    </a>
                  </Link>
                )
              )
            ) : (
              <h3 className="my-10">No Posts 😢</h3>
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
  const newPosts = await Promise.all(
    posts.map(async (post) => {
      const { img, base64 } = await generatePlaiceholder(
        post.frontmatter.cover
      );

      return { ...post, plaiceholder: { base64, img } };
    })
  );

  return {
    props: { posts: newPosts },
  };
};

export default BlogPage;
