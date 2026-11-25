import ReactPaginateModule from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './Pagination.scss'

const ReactPaginate = (ReactPaginateModule as unknown as { default?: typeof ReactPaginateModule }).default ?? ReactPaginateModule

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null

    return (
        <ReactPaginate
            pageCount={totalPages}
            forcePage={currentPage - 1}
            onPageChange={({ selected }) => onPageChange(selected + 1)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
            nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
            breakLabel="..."
            containerClassName="pagination"
            pageClassName="pagination-li"
            pageLinkClassName="pagination-item"
            activeClassName="active"
            previousClassName="pagination-li"
            previousLinkClassName="pagination-arrow"
            nextClassName="pagination-li"
            nextLinkClassName="pagination-arrow"
            breakClassName="pagination-li"
            breakLinkClassName="pagination-dots"
            disabledClassName="disabled"
            renderOnZeroPageCount={null}
        />
    )
}
