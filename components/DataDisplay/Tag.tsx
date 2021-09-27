import { FC } from 'react';

type Props = {
  tag: string;
  href?: string;
};

const Tag: FC<Props> = ({ tag, href }) => {
  return (
    <a
      href={href}
      className="inline-block bg-gray-200 dark:bg-gray-500 px-1 rounded-md mr-1 text-sm leading-5 no-underline select-none text-gray-600 dark:text-gray-100"
    >
      # {tag}
    </a>
  );
};

export default Tag;
