
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { usePagination } from "./usePagination";

import "./Pagination.css";

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });


    // Si hay menos de 2 tiempos en el rango de paginacion, no se deberia renderizar el componente

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = (currPage) => {
        if (currPage !== lastPage) onPageChange(currPage + 1);
    };

    const onPrevious = (currPage) => {
        if (currPage !== 1) onPageChange(currPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (

        <div className="paginationContainer">
            <nav aria-label="...">
                <ul className="pagination">
                    <li 
                        className={`page-item ${currentPage === 1 ? "disabled" : null}`}
                        onClick={() => onPrevious(currentPage)}
                    >
                        <span className="page-link"><FaAngleLeft /></span>
                    </li>

                    {paginationRange.map((pageNumber, index) => {
                        return (
                            <li
                                key={index}
                                className="page-item"
                            >
                                <span 
                                    onClick={() => onPageChange(pageNumber)}
                                    className={`page-link ${pageNumber === currentPage ? "active" : null}`}
                                >{pageNumber}</span>
                            </li>   
                        )
                    })}
                    <li 
                        className={`page-item ${currentPage === lastPage ? "disabled" : null}`}
                        onClick={() => onNext(currentPage)}
                    >
                        <span className="page-link"><FaAngleRight /></span>
                    </li>
                
                </ul>
            </nav>
        </div>


    )
}

export default Pagination;