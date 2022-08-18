
import "./ProductDetails.css"

import { Link } from "react-router-dom"


function ProductDetails() {

    const p = {
        "background_image": "https://http2.mlstatic.com/D_NQ_NP_895338-MLA51028758628_082022-O.webp",
        "marca": "Genesis",
        "modelo": "IRID 503 ARGB",
        "precio": 70,
        "description": "Gabinete Genesis IRID 503 ARGB",
        "bentchmark": 200,
        "especificaciones": ["USB 2.0:2", "USB 3.0:1", "Audio HD:Si", "RGB:Si", "Factor Mother:Micro-ATX, Mini-ITX", "Ventiladores:5"],
        "categoria": "CHASIS",
        "stock": 10
    }

    return (
        <div className="container">
            <div className="containerRow">
                <img src={p.background_image} />
                <div className="containerColumn">
                    <div className="containerRow">
                        <h1>{`${p.categoria[0] + p.categoria.slice(1).toLowerCase()} ${p.marca} ${p.modelo}`}</h1>
                        <Link to={'/'}>
                            <button>X</button>
                        </Link>
                    </div>
                    <h3>Brand: {p.marca}</h3>
                    <h3>Model: {p.modelo}</h3>
                    <h3>${p.precio}</h3>
                    <p>{`(${p.stock} available)`} </p>
                </div>
            </div>
            <h3>{p.description}</h3>
            <h3>Specs</h3>
            {p.especificaciones && p.especificaciones.map((e) => { return <li>{e}</li> })}
        </div>
    )
}


export default ProductDetails;