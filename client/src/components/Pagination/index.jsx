
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { usePagination, DOTS } from "./usePagination";

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

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className={"paginationContainer"}>
            {/* Left navigation arrow */}
            <button
                onClick={onPrevious}
                disabled={currentPage === 1 ? true : null}
                
            ><li
                className={"paginationItem"}
            >
                    <FaAngleLeft />
                </li>
            </button>
            {/* Render page pills */}
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <li
                        key={index}
                        className={"paginationItemDots"}
                    >&#8230;</li>
                }

                return (
                    <li
                        key={index}
                        onClick={() => onPageChange(pageNumber)}
                        className={pageNumber === currentPage ? "paginationItem selected" : "paginationItem"}
                    >{pageNumber}</li>
                )
            })}
            {/* Right navigation arrow */}
            <button
                onClick={onNext}
                disabled={currentPage === lastPage ? true : null}

            ><li
                className={"paginationItem"}
            ><FaAngleRight /></li>
            </button>
        </ul>
    )
}

export default Pagination;