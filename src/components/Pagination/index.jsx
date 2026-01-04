import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

export default function Pagination({ onPageChange, value }) {
  return (
    <>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onPageChange(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        forcePage={value - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
