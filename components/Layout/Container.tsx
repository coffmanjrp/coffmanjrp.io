import { FC } from 'react';

const Container: FC = ({ children }) => {
  return (
    <div className="flex justify-around flex-1 w-full py-24 md:pt-24">
      {children}
    </div>
  );
};

export default Container;
