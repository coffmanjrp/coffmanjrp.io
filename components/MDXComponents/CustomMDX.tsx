import { FC, ReactNode, useEffect } from 'react';
import Link from 'next/link';

type Props = {
  children?: ReactNode;
  href?: string;
};

export const CustomLink: FC<Props> = (props) => {
  const href = props.href;
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
