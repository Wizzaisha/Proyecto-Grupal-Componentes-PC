// Esta cosa es una funcion! que utiliza useMemo
// y se pasa como parametros un objeto que tiene los
// parametros ahi descritos que son necesarios para el paginado

import { useMemo } from "react";

const range = (start, end) => {
    let length = end - start + 1;

    /* Se crea un array con una cierta longitud y le asigna valores
    dentro de este desde el inicio hasta el final, ejemplo:
    un arr de 1 a 5 (length 5) => [1, 2, 3, 4, 5] */

    return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}) => {
    // El use memo se encargara de correr la logica del pagination cada vez que
    // exista un cambio en las variables de que es dependiente la paginacion
    const paginationRange = useMemo(() => {

        // La logica principal va aca


        const totalPageCount = Math.ceil(totalCount / pageSize);


        const totalPageNumbers = siblingCount + 5;

        // Case 1
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        };

        // Calculo el conteo de los botones a la derecha y a la izquierda
        // y asegurandose que se encuentre en el rango que deberia estar

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        // Case 2

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, totalPageCount];
        }

        // Case 3

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

            return [firstPageIndex, ...rightRange];
        }

        // Case 4

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, ...middleRange, lastPageIndex];
        }

    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
}