import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaRegTimesCircle } from 'react-icons/fa';
import { Card, Layout, Tag, Tags, SearchBox } from '@/components/index';
import clsx from 'clsx';
import { BASE_URL } from '@/config/index';
import { getProjectsList } from '@/lib/api';
import styles from '@/styles/index';

type Props = {
  projects: {
    frontmatter: {
      slug: string;
      title: string;
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
const BlogPage: NextPage<Props> = ({ projects }) => {
  const [term, setTerm] = useState<string>('');
  const [filterdPosts, setFilterdPosts] = useState<FilterdPosts>([]);
  const router = useRouter();
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
              placeholder="Search Project By Title"
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
              {filterdPosts.map(
                ({
                  frontmatter: { slug, title, tags },
                  plaiceholder: { img },
                }) => {
                  const tagArray = tags?.trim().split(',');

                  return (
                    <Card key={slug} img={img} title={title} href={'/projects'}>
                      <Tags tags={tagArray} page="projects" />
                    </Card>
                  );
                }
              )}
            </div>
          ) : (
            <h3 className="my-10 text-2xl">No Projects 😢</h3>
          )}
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

export default BlogPage;
