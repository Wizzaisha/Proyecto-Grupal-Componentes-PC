import "./ProductCards.css";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllProducts,
    getAllCategories,
    filterAndSortBy
} from "../../redux/actions";

import Pagination from "../Pagination/";
import ProductCard from "../ProductCard";

let pageSize = 15;

function ProductCards() {

    // Redux states and dispatch
    let allProducts = useSelector(state => state.products);
    const allCategories = useSelector(state => state.allCategories);
    const dispatch = useDispatch();
    
    // States filter and sort
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentSort, setCurrentSort] = useState("");
    const [checkedBrand, setCheckedBrand] = useState([]);
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const currentProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return allProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, allProducts]);

    let brands = [];

    if (currentCategory.length > 0) {
        allProducts.forEach(product => {
            if(brands.indexOf(product.marca) === -1) brands.push(product.marca);
        });
    }

    // Filtros
    // By category
    function handleCategorySelect(value) {
        dispatch(filterAndSortBy({category: value, sort: currentSort, brands: checkedBrand}));

    }

    // By brand

    function handleBrandCheckBox(value) {
        const currentIndex = checkedBrand.indexOf(value);

        const newCheked = [...checkedBrand];

        if (currentIndex === -1){
            newCheked.push(value);
        } else {
            newCheked.splice(currentIndex, 1);
        }

        dispatch(filterAndSortBy({category: currentCategory, sort: currentSort, brands: newCheked}));

        setCheckedBrand(newCheked);

        setCurrentPage(1);
    }

    // Sort

    function handleSort(event) {
        const { value } = event.target;

        if (value !== "default") {
            dispatch(filterAndSortBy({category: currentCategory, sort: value, brands: checkedBrand}));
            setCurrentSort(value);
        }

    }

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllCategories());

    }, [dispatch]);

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
                                    setCurrentCategory(category.name);
                                }}
                                key={index}
                                className={`list-group-item list-group-item-action`}
                            >{category.name}</button>
                        )
                    })}

                </div>

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
                <div>
                    <p>Filter by brand</p>
                    {brands && brands.map((brand, index) => {
                        return (
                            <div key={index}>
                                <label>{brand}</label>
                                <input
                                    type={"checkbox"}
                                    onChange={() => handleBrandCheckBox(brand)}
                                    checked={checkedBrand.indexOf(brand) === -1 ? false : true}
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