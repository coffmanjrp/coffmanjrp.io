import { FC } from 'react';
import { useTheme } from 'next-themes';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import {
  toggleMenu,
  selectShowMenu,
} from '@/features/MobleMenu/mobileMenuSlice';
import useHasMounted from '@/hooks/useHasMounted';

const NavButtons: FC = () => {
  const showMenu = useAppSelector(selectShowMenu);
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <h3>Rendering Error...</h3>;
  }

  return (
    <>
      <button
        type="button"
        className="block text-2xl text-gray-600 p-2 hover:opacity-75 dark:text-gray-50"
        aria-label="Toggle theme mode"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? <FiSun /> : <FiMoon />}
      </button>
      <a
        href="https://github.com/coffmanjrp"
        className="block text-2xl p-2 text-gray-600 no-underline hover:opacity-75 focus:outline-none focus:ring dark:text-gray-50"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Visit to coffmanjrp's Github profile"
      >
        <FaGithub />
      </a>
      <button
        type="button"
        className="block text-2xl text-gray-600 p-2 hover:opacity-75 md:hidden dark:text-gray-50"
        aria-label="Toggle menu"
        onClick={() => dispatch(toggleMenu())}
      >
        {showMenu ? <FaTimes /> : <FaBars />}
      </button>
    </>
  );
};

export default NavButtons;
