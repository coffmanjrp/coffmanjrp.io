import { FC, ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  children?: ReactNode;
  href?: string;
};

const CustomLink: FC<Props> = (props) => {
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

export default CustomLink;
