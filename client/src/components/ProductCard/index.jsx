import "./ProductCard.css";


import { Link } from "react-router-dom";


function ProductCard(props) {


    return (
        
        <div className="cardContainer">
            <Link to={`/store/${props.id}`}>
                <img className="cardImage" src={props.background_image} alt="img"></img>
                <div className="textComplement">
                    <p>{props.marca} {props.modelo}</p>
                    <p>{props.precio} $</p>
                </div>
            </Link>
        </div>
        
    )
}


export default ProductCard;