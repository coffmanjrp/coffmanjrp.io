import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  count: number;
  contentPerPage: number;
  totalPageCount: number[];
  prevPage: () => void;
  nextPage: () => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  minContentIndex: number;
  maxContentIndex: number;
};

const Pagenation: FC<Props> = ({
  count,
  contentPerPage,
  totalPageCount,
  prevPage,
  nextPage,
  currentPage,
  setCurrentPage,
  minContentIndex,
  maxContentIndex,
}) => {
  return (
    <>
      {count >= contentPerPage && (
        <div className="mt-8">
          <ul className="flex gap-2">
            {currentPage !== 1 && (
              <li className="flex justify-center items-center h-12 w-12 border border-gray-400 rounded">
                <button
                  type="button"
                  className="w-full h-full bg-transparent border-none text-base text-gray-600 cursor-pointer"
                  onClick={prevPage}
                >
                  Prev
                </button>
              </li>
            )}
            {totalPageCount.map((index) => {
              if (index > minContentIndex && index <= maxContentIndex) {
                return (
                  <li
                    key={index}
                    className="flex justify-center items-center h-12 w-12 border border-gray-400 rounded"
                  >
                    <button
                      type="button"
                      className="w-full h-full bg-transparent border-none text-base text-gray-600 cursor-pointer"
                      onClick={() => setCurrentPage(index)}
                    >
                      {index}
                    </button>
                  </li>
                );
              }

              return false;
            })}
            {currentPage !== totalPageCount.length - 1 && (
              <li className="flex justify-center items-center h-12 w-12 border border-gray-400 rounded">
                <button
                  type="button"
                  className="w-full h-full bg-transparent border-none text-base text-gray-600 cursor-pointer"
                  onClick={nextPage}
                >
                  Next
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Pagenation;
