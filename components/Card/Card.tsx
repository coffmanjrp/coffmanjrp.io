import { FC } from 'react';
import { cx } from '@/styles/index';
import { CardImage, CardTitle } from './index';

type Props = {
  href: string;
  img: {
    src: string;
    width: number;
    height: number;
    type: string;
    blurDataURL: string;
  };
  title: string;
};

const Card: FC<Props> = ({ href, img, title, children }) => {
  return (
    <div className="flex flex-col border p-4 w-full border-gray-300 dark:border-gray-50 rounded">
      <CardImage img={img} title={title} href={href} />
      <CardTitle title={title} href={href} />
      <p className={cx('b-paragraph')}>{children}</p>
    </div>
  );
};

export default Card;
