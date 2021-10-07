import { FC } from 'react';
import { parseISO, format } from 'date-fns';
import { Badge, Card, Tag } from '@/components/index';

type Props = {
  posts: {
    frontmatter: {
      slug: string;
      title: string;
      published: string;
      updated?: string;
      author: string;
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
  cols: number;
};

const CardPostsLayout: FC<Props> = ({ cols, posts }) => {
  return (
    <>
      {posts.length > 0 ? (
        <div
          className={`grid gap-4 grid-cols-1 sm:grid-cols-${cols} my-2 w-full mt-4`}
        >
          {posts.map(
            ({
              frontmatter: { slug, title, updated, published, tags },
              plaiceholder: { img },
            }) => {
              const tagArray = tags?.trim().split(',');

              return (
                <Card key={slug} img={img} title={title} href={`/blog/${slug}`}>
                  {updated ? (
                    <>
                      {format(parseISO(updated), 'MMMM dd, yyyy')}{' '}
                      <Badge scheme="warning">❗ Updated</Badge>
                    </>
                  ) : (
                    format(parseISO(published), 'MMMM dd, yyyy')
                  )}
                  <div className="flex gap-1 flex-wrap mt-2">
                    {tagArray?.map((tag, index) => (
                      <Tag key={index} tag={tag} href={`/blog?term=${tag}`} />
                    ))}
                  </div>
                </Card>
              );
            }
          )}
        </div>
      ) : (
        <h3 className="my-10 text-2xl">No Posts 😢</h3>
      )}
    </>
  );
};

export default CardPostsLayout;
