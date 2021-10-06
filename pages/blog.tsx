import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseISO, format } from 'date-fns';
// @ts-ignore
import qs from 'qs';
import { FaRegTimesCircle } from 'react-icons/fa';
import { Badge, Card, Layout, Tag, SearchBox } from '@/components/index';
import { BASE_URL } from '@/config/index';
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

type FilterdPosts = {
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

// @todo - use React memoization
const BlogPage: NextPage<Props> = ({ posts }) => {
  const [term, setTerm] = useState<string>('');
  const [filterdPosts, setFilterdPosts] = useState<FilterdPosts>([]);
  const router = useRouter();
  const seo = {
    title: 'Blog',
    canonical: `${BASE_URL}/blog`,
  };

  useEffect(() => {
    filterPosts();

    // eslint-disable-next-line
  }, [term]);

  const filterPosts = () => {
    const results = posts.filter((post) =>
      post.frontmatter.title.toLowerCase().includes(term.toLowerCase())
    );

    setFilterdPosts(results);
  };

  return (
    <>
      <Layout seo={seo}>
        <main className={cx('u-main')}>
          <div className="relative w-full mb-8">
            <h1 className={cx('b-heading')}>Blog</h1>
            <p className={cx('b-paragraph', 'my-6')}>
              There are a total of {posts.length} articles that I have written
              for this site. You can use the search box below to narrow your
              search by article title.
            </p>
            <SearchBox term={term} setTerm={setTerm} />
            {router.query.term && (
              <div className="flex">
                <span className="mr-2">Filtered By Tag:</span>
                <Tag
                  tag={router.query.term}
                  href={`/blog?term=${router.query.term}`}
                />
                <Link href="/blog">
                  <a className="p-1 text-base text-red-500 rounded-full cursor-pointer">
                    <FaRegTimesCircle />
                  </a>
                </Link>
              </div>
            )}
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4">
            {filterdPosts.length > 0 ? (
              filterdPosts.map(
                ({
                  frontmatter: { slug, title, updated, published, tags },
                  plaiceholder: { img },
                }) => {
                  const tagArray = tags?.trim().split(',');

                  return (
                    <Card
                      key={slug}
                      img={img}
                      title={title}
                      href={`/blog/${slug}`}
                    >
                      {updated ? (
                        <>
                          {format(parseISO(updated), 'MMMM dd, yyyy')}{' '}
                          <Badge scheme="warning">❗ Updated</Badge>
                        </>
                      ) : (
                        format(parseISO(published), 'MMMM dd, yyyy')
                      )}
                      <div className="flex gap-1 flex-wrap mt-2">
                        {tagArray?.map((tag, index) => (
                          <Tag
                            key={index}
                            tag={tag}
                            href={`/blog?term=${tag}`}
                          />
                        ))}
                      </div>
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
  const res = await fetch(`${BASE_URL}/api/blog/posts?${q}
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
