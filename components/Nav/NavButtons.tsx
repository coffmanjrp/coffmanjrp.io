import { FC } from 'react';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';

const NavButtons: FC = () => {
  return (
    <>
      <button
        type="button"
        className="block text-2xl text-gray-600 p-2 hover:opacity-75 dark:text-gray-50"
        aria-label="Toggle theme mode"
      >
        <FiSun />
      </button>
      <a
        href="https://github.com/coffmanjrp"
        className="block text-2xl p-2 text-gray-600 no-underline hover:opacity-75 focus:outline-none focus:ring dark:text-gray-50"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Visit to coffmanjrp's Github page"
      >
        <FaGithub />
      </a>
    </>
  );
};

export default NavButtons;
