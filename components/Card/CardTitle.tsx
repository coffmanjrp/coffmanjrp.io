import React, { FC } from 'react';
import Link from 'next/link';

type Props = {
  title: string;
  href: string;
};

const CardTitle: FC<Props> = ({ title, href }) => {
  return (
    <Link href={href}>
      <a>
        <h4 className="mb-2 w-full text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100 hover:underline">
          {title}
        </h4>
      </a>
    </Link>
  );
};

export default CardTitle;
