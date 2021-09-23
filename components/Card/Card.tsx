import { FC } from 'react';
import Link from 'next/link';
import { cx } from '@/styles/index';
import { CardImage, CardTitle } from './index';

type Props = {
  link: string;
  img: {
    src: string;
    width: number;
    height: number;
    type: string;
    blurDataURL: string;
  };
  title: string;
};

const Card: FC<Props> = ({ link, img, title, children }) => {
  return (
    <Link href={link}>
      <a className="flex flex-col border p-4 w-full border-gray-300 dark:border-gray-50 rounded">
        <CardImage img={img} title={title} />
        <CardTitle title={title} />
        <p className={cx('b-paragraph')}>{children}</p>
      </a>
    </Link>
  );
};

export default Card;
