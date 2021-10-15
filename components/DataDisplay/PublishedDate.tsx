import { FC } from 'react';
import { parseISO, format } from 'date-fns';
import Badge from './Badge';

type Props = {
  published: string;
  updated: boolean;
};

const PublishedDate: FC<Props> = ({ published, updated }) => {
  return (
    <>
      {format(parseISO(published), 'MMMM dd, yyyy')}
      {updated && (
        <>
          {' '}
          <Badge scheme="warning">❗ Updated</Badge>
        </>
      )}
    </>
  );
};

export default PublishedDate;
