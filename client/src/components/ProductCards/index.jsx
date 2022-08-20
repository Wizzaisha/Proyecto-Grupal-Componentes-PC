import "./ProductCards.css";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    filterAndSortBy,
    addAndRemoveFilterBrand,
    setSort,
    getAllProducts,
} from "../../redux/actions";

import Pagination from "../Pagination/";
import ProductCard from "../ProductCard";
import CategoriesBar from "../CategoriesBar";

let pageSize = 10;

function ProductCards() {

    // Redux states and dispatch
    let allProducts = useSelector(state => state.products);
    
    const currentBrands = useSelector(state => state.brands);
    const currentFilterBrands = useSelector(state => state.filterBrands);
    const currentCategory = useSelector(state => state.category);
    const dispatch = useDispatch();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const [sort, setCurrentSort] = useState("");

    const currentProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return allProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, allProducts]);
    
  
    
    // Filtros
    
    // By brand
    function handleBrandCheckBox(value) {
        
        dispatch(addAndRemoveFilterBrand(value));

        dispatch(filterAndSortBy());

        setCurrentPage(1);
    }

    function handleClearFilters () {
        dispatch(getAllProducts());
    }

    // Sort

    function handleSort(event) {
        const { value } = event.target;

        if (value !== "default") {
            dispatch(setSort(value));
            dispatch(filterAndSortBy());
            setCurrentSort(value);
        }

    }

    return (
        <div className="mainContainer">
            <div>
                
                <CategoriesBar 
                    setCurrentPage={setCurrentPage}
                />

                <div>
                        <div>
                            
                            <div>
                                <span>Sort alphabetically</span>
                                <select onChange={handleSort}>
                                    <option value={"default"}>Select option</option>
                                    <option value={"A - Z"}>A - Z</option>
                                    <option value={"Z - A"}>Z - A</option>
                                </select>
                            </div>
                            <div>
                            <span>Sort by Price</span>
                            <select onChange={handleSort}>
                                <option value={"default"}>Select option</option>
                                <option value={"priceAsc"}>Ascending</option>
                                <option value={"priceDesc"}>Descending</option>
                            </select>
                            </div>
                        </div>
                    


                </div>
                <div>
                    {currentCategory && <p>Filter by brand</p>}
                    {currentBrands && currentCategory && currentBrands.map((brand, index) => {
                        return (
                            <div key={index}>
                                
                                <label>{brand}</label>
                                <input
                                    type={"checkbox"}
                                    onChange={() => handleBrandCheckBox(brand)}
                                    checked={currentFilterBrands.indexOf(brand) === -1 ? false : true}
                                >
                                </input>
                            </div>
                        )
                    })}
                </div>
            </div>
            { currentCategory &&
                <div>
                    <button onClick={handleClearFilters}>Clear Filters</button>
                </div>
            }
            <div className="cardsContainer">
                
                {currentProducts && currentProducts.map((product, index) => {
                    return (
                        <ProductCard
                            key={index}
                            id={`${product.marca}${product.modelo}`} 
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