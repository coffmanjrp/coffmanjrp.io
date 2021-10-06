import type { NextPage } from 'next';
import { Layout } from '@/components/index';
import { cx } from '@/styles/index';

const Home: NextPage = () => {
  const seo = {
    title: 'Home',
  };

  return (
    <>
      <Layout seo={seo}>
        <main className={cx('u-main')}>
          <h1 className={cx('b-heading')}>Hi! I’m Paul Coffman Jr.</h1>
          <p className={cx('b-lead', 'my-5', 'text-3xl')}>
            Frontend, Backend, Web developer
          </p>
          <p className={cx('b-paragraph')}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </main>
      </Layout>
    </>
  );
};

export default Home;
