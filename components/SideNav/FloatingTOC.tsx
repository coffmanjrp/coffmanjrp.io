import { FC } from 'react';
// @ts-ignore
import { slug } from 'github-slugger';

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

type Tag = 'h2' | 'h3' | 'h4' | 'h5';

const FloatingTOC: FC<Props> = ({ toc }) => {
  const indent: Indent = {
    h2: 'ml-4',
    h3: 'ml-8',
    h4: 'ml-12',
    h5: 'ml-16',
  };

  return (
    <aside className="w-[24vw] hidden lg:block text-sm pl-4">
      <ul className="sticky max-h-[calc(100vh-4rem)] top-16 pt-8 pb-10 m-0 overflow-y-auto">
        {toc?.map((item) => {
          const { tag, innerText } = item;
          const slugger = slug(innerText);

          return (
            <li key={slugger} className={`mb-1.5 ${indent[tag as Tag]}`}>
              <a
                href={`#${slugger}`}
                className="link-secondary text-sm dark:hover:text-gray-400 hover:font-semibold"
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
