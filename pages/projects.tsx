import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaRegTimesCircle } from 'react-icons/fa';
import {
  Card,
  Layout,
  Pagenation,
  Tag,
  Tags,
  SearchBox,
} from '@/components/index';
import clsx from 'clsx';
import { BASE_URL } from '@/config/index';
import { getProjectsList } from '@/lib/api';
import { FilterdProjects, PagenationProps, ProjectsProps } from '@/lib/types';
import usePagenation from '@/hooks/usePagenation';
import styles from '@/styles/index';

// @todo - use React memoization
const ArticlePage: NextPage<ProjectsProps> = ({ projects }) => {
  const [term, setTerm] = useState<string>('');
  const [filterdPosts, setFilterdPosts] = useState<FilterdProjects>([]);
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
    title: 'Projects',
    canonical: `${BASE_URL}/projects`,
  };

  useEffect(() => {
    filterPosts();

    // eslint-disable-next-line
  }, [term, router]);

  const filterPosts = () => {
    const results = projects.filter((project) =>
      project.frontmatter.title.toLowerCase().includes(term.toLowerCase())
    );

    setFilterdPosts(results);
  };

  return (
    <>
      <Layout seo={seo}>
        <main className={clsx(styles.main)}>
          <div className="relative w-full mb-8">
            <h1 className={clsx(styles.heading)}>Projects</h1>
            <p className={clsx(styles.paragraph, 'my-6')}>
              You can use the search box below to narrow down your search for
              project titles.
            </p>
            <SearchBox
              term={term}
              setTerm={setTerm}
              placeholder="Search Projects By Title"
            />
            {router.query.term && (
              <div className="flex">
                <span className="mr-2">Filtered By Tag:</span>
                <Tag
                  tag={router.query.term}
                  href={`/projects?term=${router.query.term}`}
                />
                <Link href="/projects">
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
                    frontmatter: { slug, title, tags },
                    plaiceholder: { img },
                  }) => {
                    const tagArray = tags?.trim().split(',');

                    return (
                      <Card
                        key={slug}
                        img={img}
                        title={title}
                        href={'/projects'}
                      >
                        <Tags tags={tagArray} page="projects" />
                      </Card>
                    );
                  }
                )}
            </div>
          ) : (
            <h3 className="my-10 text-2xl">No Projects 😢</h3>
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
  const projects = await getProjectsList(term);

  return {
    props: { projects },
  };
};

export default ArticlePage;
