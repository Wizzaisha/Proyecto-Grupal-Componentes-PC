import "./CategoriesBar.css";

import { useDispatch, useSelector } from "react-redux";

import {
    setCategory,
    getCurrentBrands,
    filterAndSortBy,
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


    return (
        <div>
            <button 
                className="btn btn-secondary" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseExample" 
                aria-expanded="false" 
                aria-controls="collapseExample"
            >Filter by categories
            </button>
            <div id="collapseExample" className="collapse">
                <div className="btn-group-vertical">
                    {allCategories && allCategories.map((category, index) => {
                        return (
                            <div key={index}>
                                <label 
                                    className={`radioButton btn btn-outline-secondary ${currentCategory === category.name ? "checked" : "nochecked"} `}
                                >
                                    <input
                                        type={"radio"} 
                                        className="btn-check"
                                        autoComplete="off"
                                        value={category.name}
                                        onChange={handleCategorySelect}
                                        checked={currentCategory === category.name ? true : false}
                                    /> 
                                    {category.name}
                                </label>

                            </div>

                        )
                    })}
                </div>
            </div>
            

        </div>
    )
}


export default CategoriesBar;