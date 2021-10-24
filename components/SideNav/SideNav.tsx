import { FC } from 'react';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';

type Props = {
  sideNav?: string;
};

const SideNav: FC<Props> = ({ sideNav }) => {
  const btnText =
    sideNav &&
    `Go To 
${
  sideNav.charAt(0).slice(0, 1).toUpperCase() + sideNav.slice(1, sideNav.length)
}`;

  return (
    <div className="hidden md:block w-[24vw]">
      <ul className="sticky flex justify-center items-center max-h-[calc(100vh-4rem)] top-16 pt-8 pb-10 m-0 overflow-y-auto">
        {sideNav && (
          <li>
            <Link href={`/${sideNav}`}>
              <a className="inline-flex justify-center align-center bg-gray-200 dark:bg-gray-500 rounded-md mr-1 p-3 text-sm leading-relaxed no-underline select-none text-gray-600 dark:text-gray-100">
                <span className="mr-1 pt-1 align-text-top">
                  <FaChevronLeft />
                </span>
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
