import "./ProductCard.css";


import { Link } from "react-router-dom";
import StarsComponent from "../StarsComponent";


function ProductCard(props) {


    return (

        <div className={`cardContainer ${props.stock < 5 ? "fewUnits" : "border-dark border-opacity-10"}`}>
            <Link to={`/store/${props.id}`} className="linkStyle">
                {props.stock === 0 ? <h5 style={{ color: "red" }}>Out of stock</h5> : null}
                <img className="cardImage" src={props.image} alt="img"></img>
                <div className="textComplement">
                    <h5 className="tx3">{props.category} {props.brand} {props.model}</h5>
                    {props.stock === 1 ? <p>{props.stock} unit available</p> : <p>{props.stock} units available</p>}
                    <StarsComponent rating={props.rating} />
                    <h6>$ {props.price}</h6>
                </div>
            </Link>
        </div>

    )
}


export default ProductCard;