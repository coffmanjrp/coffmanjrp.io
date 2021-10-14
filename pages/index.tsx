import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import clsx from 'clsx';
import { Card, Layout, PublishedDate, Tags } from '@/components/index';
import { getBlogPostsList, getProjectsList } from '@/lib/api';
import styles from '@/styles/index';
import { ALlDataProps } from '@/lib/types';

const Home: NextPage<ALlDataProps> = ({ blogPosts, projects }) => {
  const slicedPosts = blogPosts.slice(0, 2);
  const slicedProjedcts = projects.slice(0, 2);
  const seo = {
    title: 'Home',
  };

  return (
    <>
      <Layout seo={seo}>
        <main className={clsx(styles.main)}>
          <h1 className={clsx(styles.heading)}>Hi! I’m Paul Coffman Jr.</h1>
          <p className={clsx(styles.lead, 'my-5', 'text-3xl')}>
            Frontend, Backend, Web developer
          </p>
          <p className={clsx(styles.paragraph)}>
            Hello, I’m Paul Coffman Jr. I’m Frontend, Backend, Web developer.
            Fluent in English/Japanese. You can contact me on{' '}
            <a
              href="https://www.linkedin.com/in/paul-coffman-jr/"
              target="_blank"
              rel="noreferrer noopener"
              className={clsx(styles.link.primary)}
            >
              LinkedIn
            </a>
            ,{' '}
            <a
              href="https://twitter.com/coffmanjrp"
              target="_blank"
              rel="noreferrer noopener"
              className={clsx(styles.link.primary)}
            >
              Twitter
            </a>
            , or{' '}
            <a
              href="mailto:coffmanjrp@gmail.com?subject=%E3%80%90Mail%20to%20coffmanjrp.io%E3%80%91"
              target="_blank"
              rel="noreferrer noopener"
              className={clsx(styles.link.primary)}
            >
              Email
            </a>
            .
          </p>
          <section id="recent-blog-posts" className="mt-10 mb-20">
            <h2 className="mb-8 text-4xl font-bold">Recent blog posts</h2>
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
                        href={`/blog/${slug}`}
                      >
                        <PublishedDate
                          updated={updated}
                          published={published}
                        />
                        <Tags tags={tagArray} page={'blog'} />
                      </Card>
                    );
                  }
                )}
              </div>
            ) : (
              <h3 className="my-10 text-2xl">No Posts 😢</h3>
            )}
            {slicedPosts.length > 0 && (
              <Link href="/blog">
                <a className={clsx(styles.link.primary)}>
                  Read more articles
                  <span className="inline-block ml-1 no-underline">📰</span>
                </a>
              </Link>
            )}
          </section>
          <section id="recent-projects" className="mb-10">
            <h2 className="mb-8 text-4xl font-bold">Recent Projects</h2>
            {slicedProjedcts.length > 0 ? (
              <div
                className={`grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full mt-4`}
              >
                {slicedProjedcts.map(
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
            {slicedProjedcts.length > 0 && (
              <Link href="/projects">
                <a className={clsx(styles.link.primary)}>
                  View more projects
                  <span className="inline-block ml-1 no-underline">✒</span>
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
  const blogPosts = await getBlogPostsList();
  const projects = await getProjectsList();

  return {
    props: { blogPosts, projects },
  };
};

export default Home;
