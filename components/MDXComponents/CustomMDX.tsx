import { FC, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  children?: ReactNode;
  href?: string;
  src?: string;
  alt?: string;
};

export const CustomLink: FC<Props> = (props) => {
  const { href } = props;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export const ResponsiveImage: FC<Props> = (props) => {
  return (
    <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-900">
      <Image
        src={props.src}
        alt={props.alt}
        layout="fill"
        objectFit="contain"
        {...props}
      />
    </div>
  );
};
