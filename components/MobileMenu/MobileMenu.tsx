import { FC } from 'react';
import MobileMenuLinks from './MobileMenuLinks';

type Props = {
  showMenu: boolean;
};

const MobileMenu: FC<Props> = ({ showMenu }) => {
  return (
    <nav
      className={`fixed top-0 bg-gray-50 min-h-screen pt-24 px-6 py-0 flex-shrink-0 w-full z-10 md:hidden  dark:bg-gray-900 transform transition-transform ease-out duration-300 ${
        showMenu ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <MobileMenuLinks />
    </nav>
  );
};

export default MobileMenu;
