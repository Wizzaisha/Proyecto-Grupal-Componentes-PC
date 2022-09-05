import "./ProductCard.css";


import { Link } from "react-router-dom";


function ProductCard(props) {


    return (
        
        <div className={`cardContainer ${props.stock < 5 ? "fewUnits" : ""}`}>
            <Link to={`/store/${props.id}`} className="linkStyle">
                {props.stock === 0 ? <h5 style={{color: "red"}}>Out of stock</h5> : null}
                <img className="cardImage" src={props.image} alt="img"></img>
                <div className="textComplement">
                    <p>{props.brand} {props.model}</p>
                    <p>{props.price} $</p>
                    <p>{props.rating}</p>
                    {props.stock === 1 ? <p>{props.stock} unit available</p> : <p>{props.stock} units available</p>}
                </div>
            </Link>
        </div>
        
    )
}


export default ProductCard;