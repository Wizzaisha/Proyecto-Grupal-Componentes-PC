import "./CategoriesBar.css";

import { useDispatch, useSelector } from "react-redux";

import {
    setCategory,
    getCurrentBrands,
    filterAndSortBy,
} from "../../redux/actions";

function CategoriesBar (props) {

    const allCategories = useSelector(state => state.allCategories);

    const dispatch = useDispatch();

    // By category
    function handleCategorySelect(value) {

        dispatch(setCategory(value))
        dispatch(filterAndSortBy());
        dispatch(getCurrentBrands(value));
        props.setCurrentPage(1);
        
    }


    return (
        <div>
            <p>Categories</p>
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
        </div>
    )
}


export default CategoriesBar;