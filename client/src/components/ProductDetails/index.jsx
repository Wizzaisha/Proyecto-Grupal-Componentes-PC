import "./ProductDetails.css"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import { createQuestion, getProductDetails,clearDetail } from '../../redux/actions'
// import { useAuth } from '../context/authContext'
// import starFilled from '../img/icons8-estrella-96 (1).png'
// import starEmpty from '../img/icons8-estrella-96.png'
import StarsComponent from "../StarsComponent"
import LoadingPage from "../LoadingPage"

function ProductDetails() {

    const dispatch = useDispatch()
    const { idProduct } = useParams()
    const details = useSelector(state => state.details)
    const [value, setValue] = useState(1)
    // const email = JSON.parse(localStorage.getItem(email))
    const preguntas = useSelector(state => state.question)
    // const auth = useAuth()
    // const [favorite, setFavorite] = useState(false)
    const [loadingData, setLoadingData] = useState(false);
    const [question, setQuestion] = useState('');

    useEffect(() => {

        setLoadingData(true);
        dispatch(getProductDetails(idProduct))
            .then(() => setLoadingData(false));
    }, [dispatch, idProduct])

    // useEffect(() => {

    //     const getFav = async () => {
    //         await auth.getFavorite();
    //     }
    //     getFav();
    //     if (auth.favorite.includes(details.id)) {
    //         setFavorite(true)
    //     }
    //     else {
    //         setFavorite(false)
    //     }
    // }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [])





    function handleButton(e) {
        e.preventDefault();
        // Las dos lineas de codigo siguiente actualizan el contador del cart del navbar
        let cartCounter = Number(document.querySelector('#counter').innerText) + 1;
        document.querySelector('#counter').innerText = cartCounter
        // Le agrego/sobreescribo una propiedad cantidad al producto
        details.quantities = value;
        // Traemos el ??cart?? del localStorage y lo parseamos para poder manipularlo
        let cart = JSON.parse(localStorage.getItem('cart'));
        // Si no existe (primera vez que se agrega un producto) lo definimos como un array y le pusheamos el producto en cuestion
        if (!cart) {
            cart = [];
            cart.push(details);
            alert(`Added ${details.category} ${details.brand} ${details.model} to cart`)
        }
        else {
            // Si ya existe el ??cart?? (ya se pushearon uno o mas productos) preguntamos si encuentra el producto dentro
            if (!cart.find(p => p.id === details.id)) {
                // En caso de no encontrarlo lo pushea
                cart.push(details)
                alert(`Added ${details.category} ${details.brand} ${details.model} to cart`)
            }
            else
                // En caso de encontrarlo sobreescribe la cantidad
                cart.forEach(product => { if (product.id === details.id) product.quantities = value; });

            /*alert(`This product is already added to cart`)*/
        }
        // Luego ??cart?? a string y lo subimos al localStorage
        localStorage.setItem('cart', JSON.stringify(cart))

    }

    // const handleFavorite = async () => {
    //     if (auth.user !== null) {
    //         if (favorite === false) {
    //             await auth.addFavorite(details.id)
    //             setFavorite(true)
    //         } else if (favorite === true) {
    //             await auth.removeFavorite(details.id)
    //             setFavorite(false)
    //             await auth.getFavorite();
    //         }
    //     } else {
    //         console.log('debes iniciar sesion');
    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createQuestion(details.id, question))
        alert("Question delivered");
    }

    const handleChangeUser = (e) => {
        e.preventDefault();
        setQuestion({
            sendUser: e.target.value,
            emailUser: e.target.value
        });
    };



    function stockValidator(e) {
        if (e.target.value === '+' && value < details.stock) { setValue(value + 1) }
        if (e.target.value === '-' && value > 1) { setValue(value - 1) }
    }
    console.log(preguntas);

    function handleCleanDetail(){
        dispatch(clearDetail())
    }
    return (

        loadingData
            ?
            <LoadingPage />
            :
            <div className="container">
                {details.hasOwnProperty("brand") &&
                    <div className="row detailsContainer d-flex flex-column align-items-center">
                        <div className="card row detailsContainer d-flex flex-column align-items-center">
                            <div className="d-flex flex-row justify-content-between">
                                {/* <button onClick={handleFavorite} className="btn border border-0 " style={{ width: '5rem', height: '5rem' }}>
                                    {
                                        favorite === true ? <img src={starFilled} alt="img" style={{ width: '4rem', height: '4rem' }} /> : <img src={starEmpty} alt="img" style={{ width: '4rem', height: '4rem' }} />
                                    }
                                </button> */}
                                <Link to={'/store'} className="align-self-start">
                                    <button className="btn btn-primary bg3 border-0 m-3" style={{ width: '2.3rem' }} onClick={handleCleanDetail}>X</button>
                                </Link>
                            </div>
                            <div className=" col-12 d-flex flex-sm-column flex-md-row align-items-center justify-content-center">

                                <div className="d-flex flex-column" style={{ width: '65%' }}>

                                    {details.stock === 0 ? <h3 style={{ color: "red" }}>Out of stock</h3> : null}
                                    <div>
                                        <img src={details.image} className="img w-75" alt="img" />
                                    </div>
                                    <div className='d-flex flex-column m-5 align-items-start'>
                                        <h3 className='tx4'>Description</h3>
                                        <p className='description'>{details.description}</p>
                                        <h3 className='tx4'>Specs</h3>
                                        <div className="specs">
                                            {details.specs && details.specs.map((e) => { return <li>{e}</li> })}
                                        </div>
                                    </div>
                                </div>
                                <div className="container-6 p-3 d-flex flex-column align-items-start justify-content-around border-start border-dark border-opacity-10">
                                    <div className="d-flex flex-column align-items-start justify-content-around" >
                                        <h1 className="d-flex flex-column align-items-start tx4">{`${details.category} ${details.brand} ${details.model}`}</h1>
                                        <h4>Brand: {details.brand}</h4>
                                        <h4>Model: {details.model}</h4>
                                        <h4>Price: ${details.price}</h4>
                                    </div>
                                    <div className="d-flex flex-column w-100" >
                                        <p className={`align-self-center ${details.stock < 5 ? 'text-danger fw-bold ' : null}`}>{`Stock available: (${details.stock} available)`} </p>
                                        <div className="input-group">
                                            <button type="button" className="btn btn-outline-primary" value={'-'} onClick={(e) => stockValidator(e) /*setValue(value - 1)*/}>-</button>
                                            <input aria-label="Example text with two button addons" className="text-center form-control" value={value} />
                                            <button type="button" className="btn btn-outline-primary" value={'+'} onClick={(e) => stockValidator(e) /*setValue(value + 1)*/}>+</button>

                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary button3 bg3 border-0" onClick={e => handleButton(e)} disabled={details.stock === 0 ? "true" : null}>Add to cart</button>
                                </div>
                            </div>
                            <div className="">
                                {/* <div className='d-flex flex-column align-items-start'>
                                    <h3 className='tx4'>Description</h3>
                                    <p className='description'>{details.description}</p>
                                    <h3 className='tx4'>Specs</h3>
                                    <div className="specs">
                                        {details.specs && details.specs.map((e) => { return <li>{e}</li> })}
                                    </div>
                                </div> */}
                                {/* </div> */}

                                {/* </div> */}
                                {/* <div className="card reviewsMainContainer col-12">
                                    <div className="row">
                                        <h3>User reviews</h3>
                                        {details.reviews.length === 0
                                            ?
                                            <p>There are no reviews</p>
                                            :
                                            details.reviews.map(review => {
                                                return (
                                                    <div key={review.id} className="card reviewContainer">
                                                        <div className="reviewUserName">
                                                            <p>{review.userName === "undefined" ? "Anonymous" : review.userName}</p>
                                                        </div>
                                                        <div className="reviewRating">
                                                            <p>Rating: </p>
                                                            <StarsComponent rating={review.userRating} />
                                                        </div>
                                                        <p>Review: </p>
                                                        <div className="card reviewText">
                                                            <p>{review.userReview}</p>
                                                        </div>

                                                    </div>)
                                            })
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-primary button3 bg3 border-0" onClick={e => handleButton(e)} disabled={details.stock === 0 ? "true" : null}>Add to cart</button>
                                </div> */}

                            </div>
                        </div>
                        <div className="card reviewsMainContainer col-12 px-4">
                            <div className="row">
                                <h3 className="tx4">User reviews</h3>
                                {details.reviews.length === 0
                                    ?
                                    <p>There are no reviews</p>
                                    :
                                    details.reviews.map(review => {
                                        return (
                                            <div key={review.id} className="card reviewContainer">
                                                <div className="reviewUserName">
                                                    <p>{review.userName === "undefined" ? "Anonymous" : review.userName}</p>
                                                </div>
                                                <div className="reviewRating">
                                                    <p>Rating: </p>
                                                    <StarsComponent rating={review.userRating} />
                                                </div>
                                                <p>Review: </p>
                                                <div className="card reviewText">

                                                    <p>{review.userReview}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="card px-5">
                            <h3 className="d-flex flex-row justify-content-start card-title my-5 tx4">Questions and answers</h3>
                            <h6 className="d-flex flex-row ">Any questions?</h6>

                            <form onSubmit={(e) => { handleSubmit(e) }}>
                                <input type="text" placeholder='write a question' onChange={handleChangeUser}></input>
                                <button type='submit'>send question</button>
                            </form>

                            <h5 className="d-flex flex-row justify-content-start fw-semibold">Last questions asked:</h5>
                            <div className="d-flex flex-column-reverse justify-content-start">
                                {
                                    preguntas !== undefined && Array.isArray(preguntas) && preguntas?.length > 0 ?
                                        preguntas?.map(e => {
                                            return (
                                                <div className="card d-flex flex-column align-items-start px-3 my-2">
                                                    <p>{e.sendUser}</p>
                                                    {e.sendAdmin &&
                                                        <div className=" px-5">
                                                            <p>??? {e.sendAdmin}</p>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                        :
                                        <p>There are no questions yet...</p>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
    )
}

export default ProductDetails;