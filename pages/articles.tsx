import { Dispatch, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaRegTimesCircle } from 'react-icons/fa';
import {
  Card,
  Layout,
  Pagenation,
  PublishedDate,
  Tag,
  Tags,
  SearchBox,
} from '@/components/index';
import clsx from 'clsx';
import { BASE_URL } from '@/config/index';
import { getArticleList } from '@/lib/api';
import {
  ArticlesProps,
  FilterdArticlePosts,
  PagenationProps,
} from '@/lib/types';
import usePagenation from '@/hooks/usePagenation';
import styles from '@/styles/index';

// @todo - use React memoization
const ArticlesPage: NextPage<ArticlesProps> = ({ posts }) => {
  const [term, setTerm] = useState<string>('');
  const [filterdPosts, setFilterdPosts] = useState<FilterdArticlePosts>([]);
  const router = useRouter();
  const {
    count,
    contentPerPage,
    totalPageCount,
    prevPage,
    nextPage,
    currentPage,
    setCurrentPage,
    firstContentIndex,
    lastContentIndex,
    minContentIndex,
    maxContentIndex,
  } = usePagenation({
    contentPerPage: 10,
    count: filterdPosts.length + 1,
    min: 0,
    max: 5,
  });
  const pagenationProps: PagenationProps = {
    count,
    contentPerPage,
    totalPageCount,
    prevPage,
    nextPage,
    currentPage,
    setCurrentPage,
    minContentIndex,
    maxContentIndex,
  };
  const seo = {
    title: 'Articles',
    canonical: `${BASE_URL}/articles`,
  };

  useEffect(() => {
    filterPosts();

    // eslint-disable-next-line
  }, [term, router]);

  const filterPosts = () => {
    const results = posts.filter((post) =>
      post.frontmatter.title.toLowerCase().includes(term.toLowerCase())
    );

    setFilterdPosts(results);
  };

  return (
    <>
      <Layout seo={seo}>
        <main className={clsx(styles.main)}>
          <div className="relative w-full mb-8">
            <h1 className={clsx(styles.heading)}>Articles</h1>
            <p className={clsx(styles.paragraph, 'my-6')}>
              There are a total of {posts.length} articles that I have written
              for this site. You can use the search box below to narrow down
              your search for article titles.
            </p>
            <SearchBox
              term={term}
              setTerm={setTerm}
              placeholder="Search Articles By Title"
            />
            {router.query.term && (
              <div className="flex">
                <span className="mr-2">Filtered By Tag:</span>
                <Tag
                  tag={router.query.term}
                  href={`/articles?term=${router.query.term}`}
                />
                <Link href="/articles">
                  <a className="p-1 text-base text-red-500 rounded-full cursor-pointer">
                    <FaRegTimesCircle />
                  </a>
                </Link>
              </div>
            )}
          </div>
          {filterdPosts.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4">
              {filterdPosts
                .slice(firstContentIndex, lastContentIndex)
                .map(
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
                        href={`/articles/${slug}`}
                      >
                        <PublishedDate
                          updated={updated}
                          published={published}
                        />
                        <Tags tags={tagArray} page="articles" />
                      </Card>
                    );
                  }
                )}
            </div>
          ) : (
            <h3 className="my-10 text-2xl">No Posts 😢</h3>
          )}
          <Pagenation {...pagenationProps} />
        </main>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { term },
}) => {
  const posts = await getArticleList(term);

  return {
    props: { posts },
  };
};

export default ArticlesPage;