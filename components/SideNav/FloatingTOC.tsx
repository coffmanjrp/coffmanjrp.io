import { FC } from 'react';
// @ts-ignore
import { slug } from 'github-slugger';
import { cx } from '@/styles/index';

type Props = {
  toc?: {
    tag: string;
    innerText: string;
  }[];
};

type Indent = {
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
};

const FloatingTOC: FC<Props> = ({ toc }) => {
  const indent: Indent = {
    h2: 'ml-4',
    h3: 'ml-8',
    h4: 'ml-12',
    h5: 'ml-16',
  };

  return (
    <aside className="w-64 hidden md:block text-sm pl-4">
      <ul className="overflow-y-auto sticky max-h-[calc(100vh-4rem)] top-16 pt-8 pb-10 m-0 list-none">
        {toc &&
          toc.map((item) => {
            const { tag, innerText } = item;
            const slugger = slug(innerText);

            return (
              <li key={slugger}>
                <a
                  href={`#${slugger}`}
                  className={cx(
                    'b-link',
                    'dark:hover:text-gray-400',
                    'hover:font-semibold',
                    indent[tag]
                  )}
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
