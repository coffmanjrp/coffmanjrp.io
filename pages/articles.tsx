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
import { baseUrl } from '@/config/index';
import { getArticleList } from '@/lib/api';
import { FilteredArticlePosts, ArticlesProps } from '@/lib/types';
import useFilterList from '@/hooks/useFilterList';
import usePagenation from '@/hooks/usePagenation';

const ArticlesPage: NextPage<ArticlesProps> = ({ posts }) => {
  const seo = {
    title: 'Articles',
    canonical: `${baseUrl}/articles`,
  };

  const router = useRouter();
  const { term, setTerm, filteredList } = useFilterList(posts, router);
  const { pagenationProps, firstContentIndex, lastContentIndex } =
    usePagenation({
      contentPerPage: 10,
      count: filteredList.length,
      min: 0,
      max: 5,
    });

  return (
    <>
      <Layout seo={seo}>
        <main className="main space-y-8">
          <div className="relative w-full space-y-6">
            <h1 className="heading">Articles</h1>
            <p className="paragraph">
              There are a total of {posts.length} article posts that I have
              written for this site.You can use the search box below to narrow
              it down by article titles.
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
          {filteredList.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 w-full">
              {(filteredList as FilteredArticlePosts)
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
            <h3 className="my-10 text-2xl">
              Sorry, no articles have been posted 😢
            </h3>
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
