import { FC } from 'react';
import Image from 'next/image';
import { CustomLink } from '@/components/index';

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
    <div className="flex-1">
      <CustomLink href={href}>
        <Image {...img} alt={title} placeholder="blur" />
      </CustomLink>
    </div>
  );
};

export default CardImage;
