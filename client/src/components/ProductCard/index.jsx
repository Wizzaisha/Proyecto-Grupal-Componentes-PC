import "./ProductCard.css";

function ProductCard(props) {


    return (
        <div className="cardContainer">
            <img className="cardImage" src={props.background_image} alt="img"></img>
            <div className="textComplement">
                <p>{props.marca} {props.modelo}</p>
                <p>{props.precio} $</p>
            </div>
        </div>
    )
}


export default ProductCard;