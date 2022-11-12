import React from 'react';
import './style.scss'

type Props = {
  rowCountHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  rowCount: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  pages: Array<number>;
};

const Pagination = ({
  rowCountHandler,
  rowCount,
  setCurrentPage,
  currentPage,
  pages,
}: Props) => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className='pagination--block'>
      <select
      className='dropdown--block'
        name='rowCount'
        onChange={(e) => rowCountHandler(e)}
        value={rowCount}
      >
        {arr.map((el, index) => (
          <option value={el}>{el}</option>
        ))}
      </select>
      <button
      className='pagination--button prev-button'
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev: number) => prev - 1)}
      >
        Prev
      </button>
      <button
      className='pagination--button next-button'
        disabled={currentPage === pages.length}
        onClick={() => setCurrentPage((prev: number) => prev + 1)}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
