import { FC, ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import {
  Container,
  FloatingTOC,
  Footer,
  MobileMenu,
  Nav,
  SiteNav,
} from '@/components/index';

type Props = {
  children: ReactElement;
  toc?: { tag: string; innerText: string }[];
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    openGraph?: {
      url?: string;
      title?: string;
      description?: string;
    };
  };
};

const Layout: FC<Props> = ({ children, toc, seo }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 py-0 bg-gray-100 dark:bg-gray-900">
      <NextSeo {...seo} />
      <Nav />
      <Container>
        <SiteNav />
        {children}
        <FloatingTOC toc={toc} />
      </Container>
      <Footer />
      <MobileMenu />
    </div>
  );
};

export default Layout;
