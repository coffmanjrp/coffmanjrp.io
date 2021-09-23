import { FC } from 'react';

type Props = {
  title: string;
};

const CardTitle: FC<Props> = ({ title }) => {
  return (
    <h4 className="mb-2 w-full text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100">
      {title}
    </h4>
  );
};

export default CardTitle;
