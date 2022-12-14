import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './payment.css'
import axios from 'axios'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { getAllProducts } from '../../redux/actions';
import LoadingPage from '../LoadingPage';

const index = () => {

    const stripePromise = loadStripe('pk_test_51LZyQiBbFJpttBpIyQwwHOie1Es3EW1nrUBgeyu37AsshkUlYiOd0MgmQzvYOZfzXu3B027tMW4kqrcrCXGfuH9i00xiKfxU6H')

    const CheckoutForm = () => {
        const [cart, setCart] = useState([])
        const stripe = useStripe()
        const elements = useElements()
        const auth = useAuth()
        const navigate = useNavigate();

        const dispatch = useDispatch();
        
        useEffect(() => {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }, [])

        const getTotal = () => {
            let total2 = 0;
            cart.map((el) => { return total2 += el.price * el.quantities });
            return total2;
        }  

        const [loadingPayment, setLoadingPayment] = useState(false);

        const sumaTotal = getTotal();

        const handleSubmit = async (e) => {
            e.preventDefault();
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            })
            if (!error) {
                if (city === '' || state === '' || street === '' || phone === '' || name === '') {
                    alert('Please fill in all the fields')
                } else {
                    setLoadingPayment(true);
                    const body = {
                        method_pay: paymentMethod.id,
                        customerEmail: auth.user.email,
                        products: cart.map(e => {
                            let properties = {
                                id: e.id,
                                price: e.price * 100,
                                quantity: e.quantities
                            }
                            return properties
                        }),
                        shipping: {
                            address: {
                                country: paymentMethod.card.country,
                                city: city,
                                line1: street,
                                postal_code: paymentMethod.billing_details.address.postal_code,
                                state: state
                            },
                            phone: phone,
                            name: name
                        }
                    }
                    axios.post('https://henryhardware.herokuapp.com/api/checkout', body)
                    .then((response) => {
                        setLoadingPayment(false);
                        
                        if (response.data.message) {
                            navigate('/payment/successfullPurchase');
                            localStorage.setItem('cart', '[ ]')
                            dispatch(getAllProducts());
                        }     
                    })
                    .catch((error) => {
                        setLoadingPayment(false);
                        if (error.response.data.message) {
                            navigate('/payment/failedPurchase');
                        }
                    })
                    
                }
            } else {
                alert('payment failed, please check the data.')
            }
        }

        const [city, setCity] = useState('')
        const handleInputCity = (e) => {
            setCity(e.target.value)
        }
        const [state, setState] = useState('')
        const handleInputState = (e) => {
            setState(e.target.value)
        }
        const [street, setStreet] = useState('')
        const handleInputStreet = (e) => {
            setStreet(e.target.value)
        }
        const [phone, setPhone] = useState('')
        const handleInputPhone = (e) => {
            setPhone(e.target.value)
        }
        const [name, setName] = useState('')
        const handleInputName = (e) => {
            setName(e.target.value)
        }

        return (
            loadingPayment ? 
                <div>
                    <LoadingPage />
                </div>
                : 
            
            <div className="container-fluid d-flex align-items-center justify-content-center" >
                <div className="row card p-5 paymentContainer">
                    <div className="col col-12 col-lg-6">
                        {
                            cart.length ? cart.map(el =>
                                <div className="products card mb-4" >
                                    <div className="tarjetas">
                                        <div className="col col-5 col-md-2">
                                            <img src={el.image} alt={el.model} className="img-cover" style={{ width: '100%' }} />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title tx4">{`${el.category} ${el.brand} ${el.model}`}</h5>
                                            <p className='card-text'>x{el.quantities}</p>
                                            <p className='card-text'>price: ${el.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : <p>You don't add any product...</p>
                        }
                    </div>
                    <div className='col col-12 col-lg-6'>
                        <form onSubmit={handleSubmit} className="card card-body formslide">
                            <h2 className='tx4'>shipping adress:</h2>
                            <p>Name</p>
                            <input type="text" name="Name" placeholder="write your name" onChange={(e) => handleInputName(e)}></input>
                            <p>Phone number</p>
                            <input type="number" name="Phone number" placeholder="write your phone number" onChange={(e) => handleInputPhone(e)}></input>
                            <p>City</p>
                            <input type="text" name="City" placeholder="write your city" onChange={(e) => handleInputCity(e)}></input>
                            <p>State / Province / Region</p>
                            <input type="text" name="State" placeholder="write your state, province or region" onChange={(e) => handleInputState(e)}></input>
                            <p>Street address</p>
                            <input type="text" name="Street address" placeholder="write your street address" onChange={(e) => handleInputStreet(e)}></input>
                            <p>Add credit or debit card</p>
                            <div className="form-group">
                                <CardElement className="form-control" />
                            </div>
                            {sumaTotal && (
                                <p>Total: ${sumaTotal}</p>
                            )
                            }
                            <button className="btn btn-success bg3">
                                Buy
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}

export default index