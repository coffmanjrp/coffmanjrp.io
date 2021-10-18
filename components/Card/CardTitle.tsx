import React, { FC } from 'react';
import { CustomLink } from '@/components/index';

type Props = {
  title: string;
  href: string;
};

const CardTitle: FC<Props> = ({ title, href }) => {
  return (
    <CustomLink href={href}>
      <h4 className="mb-2 w-full text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100 hover:underline">
        {title}
      </h4>
    </CustomLink>
  );
};

export default CardTitle;
