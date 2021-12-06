import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaChevronLeft } from 'react-icons/fa';

type Props = {
  sideNav?: string;
};

const SideNav: FC<Props> = ({ sideNav }) => {
  const router = useRouter();

  return (
    <div className="hidden lg:block w-[24vw]">
      <ul className="sticky flex justify-center items-center max-h-[calc(100vh-4rem)] top-16 pt-8 pb-10 m-0 overflow-y-auto">
        {sideNav && (
          <li>
            <button
              type="button"
              className="inline-flex justify-center align-center bg-gray-200 dark:bg-gray-500 rounded-md mr-1 p-3 text-sm leading-relaxed no-underline select-none text-gray-600 dark:text-gray-100"
              onClick={() => router.back()}
            >
              <span className="mr-1 pt-1 align-text-top">
                <FaChevronLeft />
              </span>
              Go Back
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideNav;
