import { FC } from 'react';
import Image from 'next/image';

type Props = {
  img: {
    src: string;
    width: number;
    height: number;
    type: string;
    blurDataURL: string;
  };
  title: string;
};

const CardImage: FC<Props> = ({ img, title }) => {
  return (
    <div className="flex-1">
      <Image {...img} alt={title} placeholder="blur" />
    </div>
  );
};

export default CardImage;
