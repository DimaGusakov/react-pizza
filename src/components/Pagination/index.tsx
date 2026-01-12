import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';


type PaginationProps = {
  value : number;
  onPageChange : (page: number) => void;

}

const Pagination : React.FC<PaginationProps> = ({ onPageChange, value }) => {
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

export default Pagination