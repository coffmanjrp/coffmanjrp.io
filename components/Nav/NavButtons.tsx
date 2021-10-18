import { FC } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import {
  toggleMenu,
  selectShowMenu,
} from '@/features/MobleMenu/mobileMenuSlice';
import useHasMounted from '@/hooks/useHasMounted';
import styles from '@/styles/index';

const NavButtons: FC = () => {
  const showMenu = useAppSelector(selectShowMenu);
  const dispatch = useAppDispatch();
  const { theme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  const handleToggleMenu = () => dispatch(toggleMenu());

  const handleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  if (!hasMounted) {
    return <h3>Rendering Error...</h3>;
  }

  return (
    <>
      <button
        type="button"
        className={clsx(styles.link.icon, 'p-2', 'text-2xl')}
        aria-label="Toggle theme mode"
        onClick={handleTheme}
      >
        {theme === 'light' ? <FiSun /> : <FiMoon />}
      </button>
      <a
        href="https://github.com/coffmanjrp"
        className={clsx(styles.link.icon, 'p-2', 'text-2xl')}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Visit to coffmanjrp's Github profile"
      >
        <FaGithub />
      </a>
      <button
        type="button"
        className={clsx(styles.link.icon, 'p-2', 'text-2xl', 'md:hidden')}
        aria-label="Toggle menu"
        onClick={handleToggleMenu}
      >
        {showMenu ? <FaTimes /> : <FaBars />}
      </button>
    </>
  );
};

export default NavButtons;
