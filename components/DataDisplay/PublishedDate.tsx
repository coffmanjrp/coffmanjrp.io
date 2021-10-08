import { FC } from 'react';
import { parseISO, format } from 'date-fns';
import Badge from './Badge';

type Props = {
  published: string;
  updated?: string;
};

const PublishedDate: FC<Props> = ({ published, updated }) => {
  return (
    <>
      {updated ? (
        <>
          {format(parseISO(updated), 'MMMM dd, yyyy')}{' '}
          <Badge scheme="warning">❗ Updated</Badge>
        </>
      ) : (
        format(parseISO(published), 'MMMM dd, yyyy')
      )}
    </>
  );
};

export default PublishedDate;
