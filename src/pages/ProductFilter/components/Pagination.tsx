
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Pagination.scss';

export default function Pagination({ currentPage, totalPages, onPageChange }: any) {
    return (
        <div className="pagination">
            <button>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {[1, 2, 3, '...', totalPages].map((page, i) => (
                <button key={i} className={currentPage === page ? 'active' : ''} >
                    {page}
                </button>
            ))}

            <button>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}
