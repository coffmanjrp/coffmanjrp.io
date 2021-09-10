import { FC, ReactElement, useState } from 'react';
import { Footer, MobileMenu, Nav } from '@/components/index';

type Props = {
  children: ReactElement;
};

const Layout: FC<Props> = ({ children }) => {
  const title = 'coffmanjrp.io';
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 py-0 bg-gray-50 dark:bg-gray-900">
      <Nav title={title} showMenu={showMenu} setShowMenu={setShowMenu} />
      {children}
      <Footer title={title} />
      <MobileMenu showMenu={showMenu} />
    </div>
  );
};

export default Layout;
