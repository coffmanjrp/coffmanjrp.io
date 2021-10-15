import { useRef } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { parseISO, format } from 'date-fns';
// @ts-ignore
import { slug } from 'github-slugger';
import { Layout, MDXComponents, Tag } from '@/components/index';
import { getAllArticleSlug, getArticle } from '@/lib/api';
import { ArticleProps } from '@/lib/types';
import { BASE_URL } from '@/config/index';
import useSyntaxTree from '@/hooks/useSyntaxTree';

const ArticlePage: NextPage<ArticleProps> = ({
  frontmatter,
  source,
  plaiceholders,
}) => {
  const root = useRef<HTMLDivElement>(null);
  const {
    title,
    published,
    updated,
    author: { name },
    tags,
  } = frontmatter;
  const { cover, portrait } = plaiceholders;
  const tagArray = tags?.trim().split(',');
  const titleSlug = slug(title);
  const syntaxTree = useSyntaxTree(root, title);
  const seo = {
    title,
    canonical: `${BASE_URL}/articles/${titleSlug}`,
    openGraph: {
      url: `${BASE_URL}/articles/${titleSlug}`,
      title,
      images: [
        {
          url: cover.src,
          alt: title,
        },
      ],
    },
  };

  return (
    <Layout seo={seo} toc={syntaxTree}>
      <article className="w-full max-w-screen-md mx-auto">
        <div className="flex flex-col w-full">
          <h1 id={titleSlug} className="text-5xl font-bold mb-8 text-center">
            {title}
          </h1>
          {cover && <Image {...cover} alt={title} placeholder="blur" />}
          <div className="inline-flex gap-1 mt-8 mb-4">
            {tagArray?.map((tag, index) => (
              <Tag key={index} tag={tag} href={`/articles?term=${tag}`} />
            ))}
          </div>
          <div className="flex justify-between md:items-center flex-col md:flex-row mt-2 w-full mb-4">
            <div className="flex items-center">
              <div className="relative inline-flex items-center justify-center flex-shrink-0 gap-2">
                <Image
                  {...portrait}
                  alt="author"
                  className="w-full h-full object-cover rounded-full"
                  width={60}
                  height={60}
                  placeholder="blur"
                />
                <div className="text-sm">
                  <p>
                    Written By <span className="font-bold">{name}</span>
                  </p>
                  <p>
                    {updated ? 'Updated' : 'Published'} on{' '}
                    <span className="font-bold">
                      {format(parseISO(published), 'MMMM dd, yyyy')}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={root}
          className="markdown markdown-blue dark:markdown-dark max-w-none"
        >
          <MDXRemote {...source} components={MDXComponents} />
        </div>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { articles } = await getAllArticleSlug();
  const paths = articles.map(({ slug }: { slug: string }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getArticle(params?.slug);

  return {
    props: {
      ...post,
    },
  };
};

export default ArticlePage;
