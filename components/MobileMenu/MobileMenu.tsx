import { FC } from 'react';
import MobileMenuLinks from './MobileMenuLinks';
import { useAppSelector } from '@/app/hooks';
import { selectShowMenu } from '@/features/MobleMenu/mobileMenuSlice';

const MobileMenu: FC = () => {
  const showMenu = useAppSelector(selectShowMenu);
  const toggleMenu = showMenu ? 'translate-x-0' : 'translate-x-[100vh]';

  return (
    <nav
      className={`fixed top-0 flex-shrink-0 pt-24 px-6 py-0 w-full min-h-screen bg-gray-100 z-10 md:hidden  dark:bg-gray-900 transform transition-transform ease-out duration-300 ${toggleMenu}`}
    >
      <MobileMenuLinks />
    </nav>
  );
};

export default MobileMenu;
