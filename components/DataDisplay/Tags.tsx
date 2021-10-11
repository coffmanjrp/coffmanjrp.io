import { FC } from 'react';
import Tag from './Tag';

type Props = {
  tags?: string[];
  page: string;
};

const Tags: FC<Props> = ({ tags, page }) => {
  return (
    <div className="flex gap-1 flex-wrap mt-2">
      {tags?.map((tag: string, index: number) => (
        <Tag key={index} tag={tag} href={`/${page}?term=${tag}`} />
      ))}
    </div>
  );
};

export default Tags;
