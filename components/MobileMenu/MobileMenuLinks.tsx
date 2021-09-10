import { FC } from 'react';
import Link from 'next/link';
import { navLinks } from '@/lib/links';

const MobileMenuLinks: FC = () => {
  return (
    <ul className="flex gap-5 flex-col mt-6 ml-3">
      {navLinks.length > 0 &&
        navLinks.map((link) => (
          <li key={link.id}>
            <Link href={link.path}>
              <a href="text-base text-gray-600 no-underline hover:opacity-75 focus:outline-none focus:ring dark:text-gray-50">
                {link.title}
              </a>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default MobileMenuLinks;
