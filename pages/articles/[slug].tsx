import { useRef } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MDXRemote } from 'next-mdx-remote';
import { parseISO, format } from 'date-fns';
// @ts-ignore
import { slug } from 'github-slugger';
import { Layout, MDXComponents, Tag } from '@/components/index';
import { getArticle } from '@/lib/api';
import { ArticleProps } from '@/lib/types';
import { baseUrl } from '@/config/index';
import useSyntaxTree from '@/hooks/useSyntaxTree';

const ArticlePage: NextPage<ArticleProps> = ({
  frontmatter,
  source,
  plaiceholders,
}) => {
  const router = useRouter();
  const upperRoute = router.asPath.split('/')[1];

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
    keywords: tags,
    description: title,
    canonical: `${baseUrl}/articles/${titleSlug}`,
    openGraph: {
      url: `${baseUrl}/articles/${titleSlug}`,
      title,
      description: title,
      keywords: tags,
      images: [
        {
          url: cover.src,
          alt: title,
        },
      ],
    },
  };

  return (
    <Layout seo={seo} toc={syntaxTree} sideNav={upperRoute}>
      <article className="w-full max-w-screen-md mx-auto">
        <div className="flex flex-col w-full">
          {cover && <Image {...cover} alt={title} placeholder="blur" />}
          <h1
            id={titleSlug}
            className="text-3xl md:text-5xl font-bold mt-4 mb-2 dark:text-gray-100"
          >
            {title}
          </h1>
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
                <div className="text-sm dark:text-gray-100">
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await getArticle(params?.slug);

  return {
    props: {
      ...post,
    },
  };
};

export default ArticlePage;
