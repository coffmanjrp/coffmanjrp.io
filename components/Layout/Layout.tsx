import { FC, ReactElement } from 'react';
import { Footer, Nav } from '@/components/index';

type Props = {
  children: ReactElement;
};

const Layout: FC<Props> = ({ children }) => {
  const title = 'coffmanjrp.io';

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 py-0 bg-gray-50 dark:bg-gray-900">
      <Nav title={title} />
      {children}
      <Footer title={title} />
    </div>
  );
};

export default Layout;
