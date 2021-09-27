import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

const CardImage: FC<Props> = ({ href, img, title }) => {
  return (
    <Link href={href}>
      <a className="flex-1">
        <Image {...img} alt={title} placeholder="blur" />
      </a>
    </Link>
  );
};

export default CardImage;
