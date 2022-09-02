import "./ProductCards.css";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    filterAndSortBy,
    addAndRemoveFilterBrand,
    setSort,
} from "../../redux/actions";

import Pagination from "../Pagination/";
import ProductCard from "../ProductCard";
import CategoriesBar from "../CategoriesBar";
import DataNotFound from "../DataNotFound";

let pageSize = 10;

function ProductCards() {

    // Redux states and dispatch
    let productState = useSelector(state => state.products);
    let allProducts = productState.filter(e => e.isDeleted === false);

    const currentBrands = useSelector(state => state.brands);
    const currentFilterBrands = useSelector(state => state.filterBrands);
    const currentCategory = useSelector(state => state.category);
    const dispatch = useDispatch();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);


    const currentProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return !allProducts.message && allProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, allProducts]);



    // Filtros

    // By brand
    function handleBrandCheckBox(value) {

        dispatch(addAndRemoveFilterBrand(value));

        dispatch(filterAndSortBy());

        setCurrentPage(1);
    }

    // Sort

    function handleSort(event) {
        const { value } = event.target;

        if (value !== "default") {
            dispatch(setSort(value));
            dispatch(filterAndSortBy());
        }

    }

    return (
        <div className="container-fluid cardsMainContainer">
            <div className="filtersContainer">

                <CategoriesBar
                    setCurrentPage={setCurrentPage}
                />
                {currentCategory &&
                    <div className="filterBrandContainer">
                        <p>Filter by brand</p>
                        {currentBrands && currentCategory && currentBrands.map((brand, index) => {
                            return (
                                <div key={index} className="form-check">

                                    <input
                                        className="form-check-input"
                                        type={"checkbox"}
                                        onChange={() => handleBrandCheckBox(brand)}
                                        checked={currentFilterBrands.indexOf(brand) === -1 ? false : true}
                                    >
                                    </input>
                                    <label className="form-check-label">{brand}</label>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>


            <div>
                <div className="sortsContainer">
                    <div className="sortContainer">
                        <select onChange={handleSort} className="form-select">
                            <option value={"default"}>Sort alphabetically</option>
                            <option value={"A - Z"}>A - Z</option>
                            <option value={"Z - A"}>Z - A</option>
                        </select>
                    </div>
                    <div className="sortContainer">
                        <select onChange={handleSort} className="form-select">
                            <option value={"default"}>Sort by Price</option>
                            <option value={"priceAsc"}>Ascending</option>
                            <option value={"priceDesc"}>Descending</option>
                        </select>
                    </div>
                </div>

                {allProducts.message
                    ? <DataNotFound />
                    :
                    <div>
                        <div className="cardsContainer">

                            {currentProducts.length > 0 ? currentProducts.map((product) => {
                                return (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        image={product.image}
                                        brand={product.brand}
                                        model={product.model}
                                        price={product.price}
                                        stock={product.stock}
                                    />
                                )
                            }) : (
                                <div>
                                    <h1>No products found...</h1>
                                </div>)
                            }


                        </div>
                        <div>
                            <Pagination
                                currentPage={currentPage}
                                totalCount={allProducts.length}
                                pageSize={pageSize}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                }

            </div>

        </div>
    )
}


export default ProductCards;