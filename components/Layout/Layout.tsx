import { FC, ReactElement } from 'react';
import {
  Container,
  FloatingTOC,
  Footer,
  MobileMenu,
  Nav,
  SideNav,
} from '@/components/index';

type Props = {
  children: ReactElement;
  toc?: string[];
};

const Layout: FC<Props> = ({ children, toc }) => {
  const title = 'coffmanjrp.io';

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 py-0 bg-gray-50 dark:bg-gray-900">
      <Nav title={title} />
      <Container>
        <SideNav />
        {children}
        <FloatingTOC toc={toc} />
      </Container>
      <Footer title={title} />
      <MobileMenu />
    </div>
  );
};

export default Layout;
