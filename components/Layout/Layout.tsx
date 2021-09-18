import { FC, ReactElement } from 'react';
import { Container, Footer, MobileMenu, Nav } from '@/components/index';

type Props = {
  children: ReactElement;
};

const Layout: FC<Props> = ({ children }) => {
  const title = 'coffmanjrp.io';

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 py-0 bg-gray-50 dark:bg-gray-900">
      <Nav title={title} />
      <Container>
        <div className="hidden md:block w-64 bg-red-200" />
        {children}
        <div className="hidden md:block w-64 bg-green-200" />
      </Container>
      <Footer title={title} />
      <MobileMenu />
    </div>
  );
};

export default Layout;
