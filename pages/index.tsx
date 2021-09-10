import type { NextPage } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 py-0 bg-gray-50 dark:bg-gray-900">
      <NextSeo />

      <main className="flex-1 w-full max-w-screen-md mx-auto py-24 md:pt-24">
        <h1 className="text-5xl font-bold">Hi! I’m Paul Coffman Jr.</h1>
        <p className="text-3xl my-5 text-gray-600 dark:text-gray-400">
          Frontend, Backend, Web developer
        </p>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center text-gray-600 no-underline hover:opacity-75 focus:outline-none focus:ring dark:text-gray-50"
          href="https://vercel.com?utm_source=create-next-app&amp;utm_medium=default-template&amp;utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className="relative w-20 h-4 ml-2">
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              layout="fill"
              objectFit="cover"
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
