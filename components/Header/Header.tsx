import { FC } from 'react';
import Link from 'next/link';
import { NavButtons, NavLinks } from '.';

const Header: FC = () => {
  return (
    <nav className="fixed md:top-0 left-0 right-0 bottom-0 flex items-center px-6 h-16 bg-gray-100 bg-opacity-75 backdrop-filter backdrop-blur-[20px] backdrop-saturate-[180%] z-30 dark:bg-gray-900 dark:bg-opacity-100">
      <div className="flex-1 md:flex-initial lg:mr-10 mr-5">
        <Link href="/">
          <a className="nav-title">coffmanjrp.io</a>
        </Link>
      </div>
      <NavLinks />
      <NavButtons />
    </nav>
  );
};

export default Header;
