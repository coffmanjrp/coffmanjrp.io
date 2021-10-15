import { useState } from 'react';

const usePagenation = ({
  contentPerPage,
  count,
  min,
  max,
}: {
  contentPerPage: number;
  count: number;
  min: number;
  max: number;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [minContentIndex, setMinContentIndex] = useState<number>(min);
  const [maxContentIndex, setMaxContentIndex] = useState<number>(max);
  const pagenation = 5;
  const pageCount = Math.floor(count / contentPerPage);
  const lastContentIndex = currentPage * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;
  // @ts-ignore
  const totalPageCount = [...Array(pageCount + 1).keys()];

  const pageTransition = (transition: boolean) => {
    if (transition) {
      setCurrentPage((state) => (state === pageCount ? state : state + 1));

      if (currentPage > maxContentIndex) {
        setMaxContentIndex(maxContentIndex + pagenation);
        setMinContentIndex(minContentIndex + pagenation);
      }
    } else {
      setCurrentPage((state) => (state === 1 ? state : state - 1));

      if (currentPage % minContentIndex === 0) {
        setMaxContentIndex(maxContentIndex - pagenation);
        setMinContentIndex(minContentIndex - pagenation);
      }
    }
  };

  return {
    count,
    contentPerPage,
    totalPageCount,
    nextPage: () => pageTransition(true),
    prevPage: () => pageTransition(false),
    minContentIndex,
    maxContentIndex,
    firstContentIndex,
    lastContentIndex,
    currentPage,
    setCurrentPage,
  };
};

export default usePagenation;