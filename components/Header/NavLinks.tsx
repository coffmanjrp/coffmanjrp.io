import { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { navLinks } from '@/lib/links';
import styles from '@/styles/index';

const NavLinks: FC = () => {
  return (
    <ul className="md:flex flex-1 gap-5 items-center hidden">
      {navLinks.length > 0 &&
        navLinks.map(({ id, path, title }) => (
          <li key={id}>
            <Link href={path}>
              <a className={clsx(styles.link.secondary)}>{title}</a>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default NavLinks;
