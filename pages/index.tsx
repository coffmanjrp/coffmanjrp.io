import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { MdFindInPage } from 'react-icons/md';
import { Card, Layout, PublishedDate, Tags } from '@/components/index';
import { getArticleList, getProjectsList } from '@/lib/api';
import { ALlDataProps } from '@/lib/types';

const Home: NextPage<ALlDataProps> = ({ articles, projects }) => {
  const seo = {
    title: 'Home',
    keywords: 'Frontend Developer, Backend Developer, Web Developer',
  };

  const slicedPosts = articles.slice(0, 2);
  const slicedProjedcts = projects.slice(0, 2);

  return (
    <>
      <Layout seo={seo}>
        <main className="main">
          <div className="space-y-5">
            <h1 className="heading">Hi! I’m Paul Coffman Jr.</h1>
            <p className="lead text-3xl">Frontend, Backend, Web developer</p>
            <p className="paragraph">
              Hello, I’m Paul Coffman Jr. I’m Frontend, Backend, Web developer.
              Fluent in English/Japanese. You can contact me on{' '}
              <a
                href="https://www.linkedin.com/in/paul-coffman-jr/"
                target="_blank"
                rel="noreferrer noopener"
                className="link-primary"
              >
                LinkedIn
              </a>
              ,{' '}
              <a
                href="https://twitter.com/coffmanjrp"
                target="_blank"
                rel="noreferrer noopener"
                className="link-primary"
              >
                Twitter
              </a>
              , or{' '}
              <a
                href="mailto:coffmanjrp@gmail.com?subject=%E3%80%90Mail%20to%20coffmanjrp.io%E3%80%91"
                target="_blank"
                rel="noreferrer noopener"
                className="link-primary"
              >
                Email
              </a>
              .
            </p>
          </div>
          <section id="recent-articles" className="mt-10 mb-20">
            <h2 className="mb-8 text-4xl font-bold dark:text-gray-100">
              Recent Articles
            </h2>
            {slicedPosts.length > 0 ? (
              <div
                className={`grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4`}
              >
                {slicedPosts.map(
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
                        <Tags tags={tagArray} page={'articles'} />
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
            {slicedPosts.length > 0 && (
              <Link href="/articles">
                <a className="link-primary">
                  Read more articles
                  <span className="inline-block ml-1 no-underline">📰</span>
                </a>
              </Link>
            )}
          </section>
          <section id="recent-projects" className="mb-10">
            <h2 className="mb-8 text-4xl font-bold dark:text-gray-100">
              My Projects
            </h2>
            {slicedProjedcts.length > 0 ? (
              <div
                className={`grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4`}
              >
                {slicedProjedcts.map(
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
                              className="icon-link text-xl"
                            >
                              <MdFindInPage />
                            </a>
                            <a
                              href={links.github}
                              target="_blank"
                              rel="noreferrer nooperner"
                              aria-label="View Github"
                              className="icon-link text-xl"
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
            {slicedProjedcts.length > 0 && (
              <Link href="/projects">
                <a className="link-primary">
                  View more projects
                  <span className="inline-block ml-1 no-underline">🧪</span>
                </a>
              </Link>
            )}
          </section>
        </main>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const articles = await getArticleList();
  const projects = await getProjectsList();

  return {
    props: { articles, projects },
  };
};

export default Home;
