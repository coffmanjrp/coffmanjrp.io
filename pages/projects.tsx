import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { FaGithub, FaRegTimesCircle } from 'react-icons/fa';
import { MdFindInPage } from 'react-icons/md';
import {
  Card,
  Layout,
  Pagenation,
  Tag,
  Tags,
  SearchBox,
} from '@/components/index';
import { baseUrl } from '@/config/index';
import { getProjectsList } from '@/lib/api';
import { FilteredProjects, ProjectsProps } from '@/lib/types';
import useFilterList from '@/hooks/useFilterList';
import usePagenation from '@/hooks/usePagenation';
import styles from '@/styles/index';

const ArticlePage: NextPage<ProjectsProps> = ({ projects }) => {
  const seo = {
    title: 'Projects',
    canonical: `${baseUrl}/projects`,
  };

  const router = useRouter();
  const { term, setTerm, filteredList } = useFilterList(projects, router);
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
          {filteredList.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4">
              {(filteredList as FilteredProjects)
                .slice(firstContentIndex, lastContentIndex)
                .map(
                  ({
                    frontmatter: { slug, title, tags, links, show },
                    plaiceholder: { img },
                  }) => {
                    const tagArray = tags?.trim().split(',');

                    return (
                      show && (
                        <Card
                          key={slug}
                          img={img}
                          title={title}
                          href={links.website}
                        >
                          <div className="flex gap-2">
                            <a
                              href={links.website}
                              target="_blank"
                              rel="noreferrer nooperner"
                              aria-label="View Website"
                              className={clsx(styles.link.icon, 'text-xl')}
                            >
                              <MdFindInPage />
                            </a>
                            <a
                              href={links.github}
                              target="_blank"
                              rel="noreferrer nooperner"
                              aria-label="View Github"
                              className={clsx(styles.link.icon, 'text-xl')}
                            >
                              <FaGithub />
                            </a>
                          </div>
                          <Tags tags={tagArray} page="projects" />
                        </Card>
                      )
                    );
                  }
                )}
            </div>
          ) : (
            <h3 className="my-10 text-2xl">
              Sorry, don&#39;t have any projects 😢
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
  const projects = await getProjectsList(term);

  return {
    props: { projects },
  };
};

export default ArticlePage;
