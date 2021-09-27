import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { parseISO, format } from 'date-fns';
import qs from 'qs';
import { Card, Layout } from '@/components/index';
import { API_ENDPOINT } from '@/config/index';
import { generatePlaiceholder } from '@/lib/plaiceholder';
import { cx } from '@/styles/index';

type Props = {
  posts: {
    frontmatter: {
      slug: string;
      title: string;
      published: string;
      updated?: string;
      author: string;
      tags?: string;
      cover: string;
    };
    plaiceholder: {
      img: {
        src: string;
        width: number;
        height: number;
        type: string;
        blurDataURL: string;
      };
    };
  }[];
};

const BlogPage: NextPage<Props> = ({ posts }) => {
  const tagArray = posts.map(({ frontmatter }) => {
    return frontmatter.tags?.split(' ');
  });

  return (
    <>
      <Layout>
        <main className={cx('u-main')}>
          <div className="relative w-full mb-8">
            <h1 className={cx('b-heading')}>Blog Posts ({posts.length})</h1>
            <p className={cx('b-paragraph', 'my-6')}>
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
                  frontmatter: { slug, title, updated, published, tags },
                  plaiceholder: { img },
                }) => {
                  const tagArray = tags?.split(' ');

                  return (
                    <Card
                      key={slug}
                      link={`/blog/${slug}`}
                      img={img}
                      title={title}
                    >
                      {updated ? (
                        <>
                          {format(parseISO(updated), 'MMMM dd, yyyy')}{' '}
                          <span className="inline-block px-1 py-0.5 bg-yellow-500 rounded text-xs text-gray-100">
                            ❗ Updated
                          </span>
                        </>
                      ) : (
                        format(parseISO(published), 'MMMM dd, yyyy')
                      )}

                      <span className="block mt-3">
                        {tagArray &&
                          tagArray.map((tag, index) => (
                            <Link key={index} href={`/blog?term=${tag}`}>
                              <a className="inline-block bg-gray-200 dark:bg-gray-500 px-1 rounded-md mr-1 text-sm leading-5 no-underline select-none text-gray-600 dark:text-gray-100">
                                # {tag}
                              </a>
                            </Link>
                          ))}
                      </span>
                    </Card>
                  );
                }
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

export const getServerSideProps: GetServerSideProps = async ({
  query: { term },
}) => {
  const q = qs.stringify({ term });
  const res = await fetch(`${API_ENDPOINT}/api/blog/posts?${q}
  `);
  const { posts } = await res.json();
  const newPosts = await Promise.all(
    posts.map(async (post: { frontmatter: { cover: string } }) => {
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

  return {
    props: { posts: newPosts },
  };
};

export default BlogPage;
