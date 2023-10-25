import { useAppDispatch, useAppSelector } from '../../app/hooks';
import '../TablePagination/TablePagination.scss';
import { setTablePage } from '../../features/tableDataReducer';

export const TablePagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tablePage, totalItems } = useAppSelector(state => state.tableData);

  const perPage = 10;
  const pagesLength = Math.ceil(totalItems / perPage);
  const pages = Array.from({ length: pagesLength }, (_, index) => index + 1);

  return (
    <>
      <ul className="pagination">
        {
          pages.map((page) => (
            <li
              className="pagination__li"
              key={page}
            >
              <a
                className={
                  tablePage === page
                  ? "pagination__link active"
                  : "pagination__link"
              }
                onClick={() => dispatch(setTablePage(page))}
                data-cy="pageLink"
                href={`#${page}`}
              >
                {page}
              </a>
            </li>
          ))
        }
      </ul>
    </>
  );
};