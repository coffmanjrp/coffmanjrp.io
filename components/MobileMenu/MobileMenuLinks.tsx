import { FC } from 'react';
import Link from 'next/link';
import { navLinks } from '@/lib/links';
import { useAppDispatch } from '@/app/hooks';
import { toggleMenu } from '@/features/MobleMenu/mobileMenuSlice';

const MobileMenuLinks: FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(toggleMenu());

  return (
    <ul className="flex gap-5 flex-col ml-3">
      {navLinks.length > 0 &&
        navLinks.map(({ id, path, title }) => (
          <li key={id}>
            <Link href={path}>
              <a className="link-secondary" onClick={handleClick}>
                {title}
              </a>
            </Link>
          </li>
        ))}
      <li>
        <Link href="/">
          <a className="link-secondary" onClick={handleClick}>
            Home
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default MobileMenuLinks;
