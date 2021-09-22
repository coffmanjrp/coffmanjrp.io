import { FC } from 'react';
import Link from 'next/link';
import { navLinks } from '@/lib/links';

const NavLinks: FC = () => {
  return (
    <ul className="md:flex flex-1 gap-5 items-center hidden">
      {navLinks.length > 0 &&
        navLinks.map(({ id, path, title }) => (
          <li key={id}>
            <Link href={path}>
              <a href="text-base text-gray-600 no-underline hover:opacity-75 focus:outline-none focus:ring dark:text-gray-50">
                {title}
              </a>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default NavLinks;
