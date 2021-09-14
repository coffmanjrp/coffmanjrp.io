import { FC, ReactNode, useEffect } from 'react';
import Link from 'next/link';
import AnchorJS from 'anchor-js';

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

export const ApplyAnchorLinks: FC<Props> = (props) => {
  const anchors = new AnchorJS();

  useEffect(() => {
    anchors.options = {
      ariaLabel: 'anchor',
      icon: '#',
    };

    anchors.add('h1, h2, h3, h4, h5, h6');

    // eslint-disable-next-line
  }, []);

  return <div>{props.children}</div>;
};
