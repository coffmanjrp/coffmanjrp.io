import { useEffect, useState } from 'react';
import { NextRouter } from 'next/router';

const useFilterList = (lists: any[], router: NextRouter) => {
  const [term, setTerm] = useState<string>('');
  const [filteredList, setFilteredList] = useState<any[]>([]);

  useEffect(() => {
    filteredPosts();

    // eslint-disable-next-line
  }, [term, router]);

  const filteredPosts = () => {
    const results = lists.filter((list: any) =>
      list.frontmatter.title.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredList(results);
  };

  return {
    term,
    setTerm,
    filteredList,
  };
};

export default useFilterList;
