import { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { FaChevronLeft } from 'react-icons/fa';
import { IconContainer } from '@/components/index';
import styles from '@/styles/index';

type Props = {
  sideNav: string;
};

const SideNav: FC<Props> = ({ sideNav }) => {
  const btnText =
    sideNav &&
    `Back to 
${
  sideNav.charAt(0).slice(0, 1).toUpperCase() + sideNav.slice(1, sideNav.length)
}
Page`;

  return (
    <div className="hidden md:block w-[24vw]">
      <ul className="sticky max-h-[calc(100vh-4rem)] top-16 pt-8 pb-10 m-0 overflow-y-auto">
        {sideNav && (
          <li>
            <Link href={`/${sideNav}`}>
              <a className="inline-flex justify-center align-center bg-gray-200 dark:bg-gray-500 rounded-md mr-1 p-3 text-sm leading-relaxed no-underline select-none text-gray-600 dark:text-gray-100">
                <IconContainer
                  icon={<FaChevronLeft />}
                  className={clsx(styles.icon.container, 'mr-1')}
                />
                {btnText}
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideNav;
