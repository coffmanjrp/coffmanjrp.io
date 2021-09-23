import { FC } from 'react';

const Container: FC = ({ children }) => {
  return (
    <div className="flex justify-around flex-1 w-full pt-12 md:pt-24 pb-24">
      {children}
    </div>
  );
};

export default Container;
