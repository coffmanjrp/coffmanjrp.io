import { useEffect, useState, RefObject } from 'react';
// @ts-ignore
import { slug } from 'github-slugger';
import { fromDom } from 'hast-util-from-dom';
import { SyntaxTree } from '@/lib/types';

const useSyntaxTree = (root: RefObject<HTMLDivElement>, title: string) => {
  const [syntaxTree, setSyntaxTree] = useState<SyntaxTree>([]);
  const titleSlug = slug(title);

  useEffect(() => {
    // @ts-ignore
    const { children } = fromDom(root.current);
    const tree = children
      .filter((item: { tagName: string }) => {
        return (
          item.tagName === 'h1' ||
          item.tagName === 'h2' ||
          item.tagName === 'h3' ||
          item.tagName === 'h4' ||
          item.tagName === 'h5' ||
          item.tagName === 'h6'
        );
      })
      .map(
        (item: {
          tagName: string;
          children: { children: { value: string }[] }[];
        }) => {
          return {
            tag: item.tagName,
            innerText: item.children[0].children[0].value,
          };
        }
      );

    setSyntaxTree([{ tag: titleSlug, innerText: title }, ...tree]);

    // eslint-disable-next-line
  }, []);

  return syntaxTree;
};

export default useSyntaxTree;
