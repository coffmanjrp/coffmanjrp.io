import { FC } from 'react';
import Link from 'next/link';

type Props = {
  tag: string | string[];
  href: string;
};

const Tag: FC<Props> = ({ tag, href }) => {
  return (
    <Link href={href}>
      <a
        href={href}
        className="inline-block bg-gray-200 dark:bg-gray-500 rounded-md mr-1 px-1 text-sm leading-relaxed no-underline select-none text-gray-600 dark:text-gray-100"
      >
        # {tag}
      </a>
    </Link>
  );
};

export default Tag;
