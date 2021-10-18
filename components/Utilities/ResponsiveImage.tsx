import { FC } from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt?: string;
};

const ResponsiveImage: FC<Props> = (props) => {
  return (
    <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-900">
      <Image alt={props.alt} layout="fill" objectFit="contain" {...props} />
    </div>
  );
};

export default ResponsiveImage;
