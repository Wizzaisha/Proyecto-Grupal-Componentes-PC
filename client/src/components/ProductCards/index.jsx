import "./ProductCards.css";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllProducts,
    getAllCategories
} from "../../redux/actions";

import Pagination from "../Pagination/";
import ProductCard from "../ProductCard";

let pageSize = 15;

function ProductCards() {

    // Redux states and dispatch
    let allProducts = useSelector(state => state.products);
    const allCategories = useSelector(state => state.allCategories);
    const dispatch = useDispatch();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const currentProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return allProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, allProducts]);

    useEffect(() => {

        dispatch(getAllProducts());
        dispatch(getAllCategories());

    }, [dispatch]);

    return (
        <div className="mainContainer">
            
            <div className="cardsContainer">
                
                {currentProducts && currentProducts.map(product => {
                    return (
                        <ProductCard 
                            background_image={product.background_image}
                            marca={product.marca}
                            modelo={product.modelo}
                            precio={product.precio}
                        />
                    )
                })}


            </div>
            <Pagination 
                currentPage={currentPage}
                totalCount={allProducts.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    )
}


export default ProductCards;