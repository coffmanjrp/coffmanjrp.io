import { FC } from 'react';
import { slug } from 'github-slugger';

type Props = {
  toc: {
    tag: string;
    innerText: string;
  }[];
};

const FloatingTOC: FC<Props> = ({ toc }) => {
  const indent = (level: string | undefined) => {
    switch (level) {
      case 'h2':
        return 'ml-4';
      case 'h3':
        return 'ml-8';
      case 'h4':
        return 'ml-12';
      case 'h5':
        return 'ml-16';
      default:
        return '';
    }
  };

  return (
    <aside className="w-64 hidden md:block text-sm pl-4">
      <ul className="overflow-y-auto sticky max-h-[calc(100vh-4rem)] top-16 pt-8 pb-10 m-0 list-none">
        {toc &&
          toc.map((item) => {
            const slugger = slug(item.innerText);

            return (
              <li key={slugger}>
                <a
                  href={`#${slugger}`}
                  className={`no-underline text-gray-600 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-400 hover:font-semibold ${indent(
                    item.tag
                  )}`}
                >
                  {item.innerText}
                </a>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default FloatingTOC;
