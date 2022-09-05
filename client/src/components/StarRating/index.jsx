import "./StarRating.css";

function StarRating (props) {

    const arr = [1, 2, 3, 4, 5];

    return (
        <div>
            {arr.map((star, index) => {
                index += 1;
                
                return (
                <button
                    type="button"
                    key={index}
                    className={`starButton ${props.rating === 0 ? "off" : index <= (props.hover || props.rating) ? "on" : "off"}`}
                    onClick={() => props.setRating(index)}
                    onMouseOver={() => props.setHover(index)}
                    onMouseOut={() => props.setHover(props.rating)}
                >
                    <span className="star">&#9733;</span>
                </button>
                );
            })}
        </div>
    )
}


export default StarRating;