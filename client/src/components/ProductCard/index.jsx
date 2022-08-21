import "./ProductCard.css";


import { Link } from "react-router-dom";


function ProductCard(props) {


    return (
        
        <div className="cardContainer">
            <Link to={`/store/${props.id}`}>
                <img className="cardImage" src={props.image} alt="img"></img>
                <div className="textComplement">
                    <p>{props.brand} {props.model}</p>
                    <p>{props.price} $</p>
                </div>
            </Link>
        </div>
        
    )
}


export default ProductCard;