import "./CategoriesBar.css";

import { useDispatch, useSelector } from "react-redux";

import {
    setCategory,
    getCurrentBrands,
    filterAndSortBy,
    getAllProducts
} from "../../redux/actions";

function CategoriesBar (props) {

    const allCategories = useSelector(state => state.allCategories);
    const currentCategory = useSelector(state => state.category);

    const dispatch = useDispatch();

    // By category
    function handleCategorySelect(event) {

        const { value } = event.target;

        dispatch(setCategory(value))
        dispatch(filterAndSortBy());
        dispatch(getCurrentBrands(value));
        props.setCurrentPage(1);
        
    }

    function handleClearFilters () {
        dispatch(getAllProducts());
    }


    return (
        <div className="categoriesBarContainer">
                            
            <div>
                { currentCategory &&
                    <button 
                        onClick={handleClearFilters}
                        className="btn btn-secondary clearFilters"
                    >Clear Filters</button>
                }
            </div>
            <div>
                <button 
                    className="btn btn-secondary collapseButton" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseExample" 
                    aria-expanded="false" 
                    aria-controls="collapseExample"
                >Filter by categories
                </button>
                <div id="collapseExample" className="collapse collapseContainer">
                    <div className="btn-group-vertical">
                        {allCategories && allCategories.map((category, index) => {
                            return (
                                <div key={index}>
                                    <label 
                                        className={`radioButton btn btn-outline-secondary ${currentCategory === category ? "checked" : "nochecked"} `}
                                    >
                                        <input
                                            type={"radio"} 
                                            className="btn-check"
                                            autoComplete="off"
                                            value={category}
                                            onChange={handleCategorySelect}
                                            checked={currentCategory === category ? true : false}
                                        /> 
                                        {category}
                                    </label>

                                </div>

                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}


export default CategoriesBar;