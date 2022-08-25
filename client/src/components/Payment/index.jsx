import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './payment.css'
import axios from 'axios'
import { useAuth } from '../context/authContext'

const index = () => {

    const stripePromise = loadStripe('pk_test_51LZyQiBbFJpttBpIyQwwHOie1Es3EW1nrUBgeyu37AsshkUlYiOd0MgmQzvYOZfzXu3B027tMW4kqrcrCXGfuH9i00xiKfxU6H')

    const CheckoutForm = () => {
        const [cart, setCart] = useState([])
        const stripe = useStripe()
        const elements = useElements()
        const auth = useAuth()

        useEffect(() => {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }, [])

        const getTotal = () => {
            let total2 = 0;
            cart.map((el) => { total2 += el.price * el.quantities });
            return total2;
        }

        const sumaTotal = getTotal();

        const handleSubmit = async (e) => {
            e.preventDefault();
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            })
            if (!error) {
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
                const { data } = await axios.post('http://localhost:3001/api/checkout', body)
                console.log(data);
                alert('Successful payment!')
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
            <div>
                {
                    cart.length ? cart.map(el =>
                        <div className="card">
                            <p >{`${el.category} ${el.brand} ${el.model}`}</p>
                            <img src={el.image} alt={el.model} className="img-fluid col" />
                            <p>x{el.quantities}</p>
                            <p >price: ${el.price}</p>
                        </div>
                    ) : <p>You don't add any product...</p>
                }
                <form onSubmit={handleSubmit} className="card card-body" style={{ width: '25rem' }}>
                    <h2>shipping adress:</h2>
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
                    <button className="btn btn-success">
                        Buy
                    </button>
                </form>
            </div>
        )
    }

    return (
        <Elements stripe={stripePromise}>
            <div className="container p-4">
                <CheckoutForm />
            </div>
        </Elements>
    )
}

export default index

