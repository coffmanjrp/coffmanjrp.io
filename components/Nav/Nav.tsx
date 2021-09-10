import { Dispatch, FC, SetStateAction } from 'react';
import Link from 'next/link';
import { NavButtons, NavLinks } from './';

type Props = {
  title: string;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
};

const Nav: FC<Props> = ({ title, showMenu, setShowMenu }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center px-6 h-16 bg-gray-50 bg-opacity-75 backdrop-filter backdrop-blur-md z-20 dark:bg-gray-900 dark:bg-opacity-100">
      <div className="md:flex-initial flex-1 lg:mr-10 mr-5">
        <Link href="/">
          <a className="text-lg">{title}</a>
        </Link>
      </div>
      <NavLinks />
      <NavButtons showMenu={showMenu} setShowMenu={setShowMenu} />
    </nav>
  );
};

export default Nav;
