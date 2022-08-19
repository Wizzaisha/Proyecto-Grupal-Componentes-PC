import "./ProductCards.css";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentBrands,
    filterAndSortBy,
    setCategory,
    addAndRemoveFilterBrand,
} from "../../redux/actions";

import Pagination from "../Pagination/";
import ProductCard from "../ProductCard";

let pageSize = 15;

function ProductCards() {

    // Redux states and dispatch
    let allProducts = useSelector(state => state.products);
    const allCategories = useSelector(state => state.allCategories);
    const currentBrands = useSelector(state => state.brands);
    const currentFilterBrands = useSelector(state => state.filterBrands);
    const currentCategory = useSelector(state => state.category);
    const dispatch = useDispatch();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const currentProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return allProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, allProducts]);
    
    // States filter and sort
    const [currentSort, setCurrentSort] = useState("");    
    
    // Filtros
    // By category
    function handleCategorySelect(value) {
        
        dispatch(setCategory(value))
        dispatch(filterAndSortBy({sort: currentSort}));
        dispatch(getCurrentBrands(value));


    }

    // By brand

    function handleBrandCheckBox(value) {
        
        dispatch(addAndRemoveFilterBrand(value));

        dispatch(filterAndSortBy({sort: currentSort}));

        setCurrentPage(1);
    }

    // Sort

    function handleSort(event) {
        const { value } = event.target;

        if (value !== "default") {
            dispatch(filterAndSortBy({sort: value}));
            setCurrentSort(value);
        }

    }

    return (
        <div className="mainContainer">
            <div>
                <p>Filtro</p>
                <div className="list-group list-group-horizontal">

                    {allCategories && allCategories.map((category, index) => {
                        return (
                            <button 
                                onClick={() => {
                                    handleCategorySelect(category.name);
                                }}
                                key={index}
                                className={`list-group-item list-group-item-action`}
                            >{category.name}</button>
                        )
                    })}

                </div>

                <div>
                    
                    { currentCategory &&
                        <div>
                            <p>Sort</p>
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
                    }


                </div>
                <div>
                    <p>Filter by brand</p>
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