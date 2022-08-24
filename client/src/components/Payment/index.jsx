import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './payment.css'
import axios from 'axios'

const index = () => {

    const stripePromise = loadStripe('pk_test_51LZyQiBbFJpttBpIyQwwHOie1Es3EW1nrUBgeyu37AsshkUlYiOd0MgmQzvYOZfzXu3B027tMW4kqrcrCXGfuH9i00xiKfxU6H')

    const CheckoutForm = () => {
        const [cart, setCart] = useState([])
        const stripe = useStripe()
        const elements = useElements()

        useEffect(() => {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }, [])

        const getTotal = () => {
            let total2 = 0;
            cart.map((el) => { total2 += el.price });
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
                console.log(paymentMethod);
                const body = {
                    method_pay: paymentMethod.id,
                    customerEmail: email,
                    products: cart.map(e => {
                        let properties = {
                            id: e.id,
                            price: e.price,
                            quantity: 1
                        }
                        return properties
                    }),
                    shipping: {
                        address: {
                            country: paymentMethod.card.country,
                            city: paymentMethod.billing_details.address.city, //no
                            line1: paymentMethod.billing_details.address.line1, //no
                            postal_code: paymentMethod.billing_details.address.postal_code,
                            state: paymentMethod.billing_details.address.state //no
                        },
                        phone: paymentMethod.billing_details.phone, //no
                        name: paymentMethod.billing_details.name //no
                    }
                }
                console.log(body)
                // const {id } = paymentMethod;
                const { data } = await axios.post('http://localhost:3001/api/checkout/', body)
                console.log(data);
                // ^^^ CONECTAR CON BACKEND ^^^
            }
        }

        const [email, setEmail] = useState('')
        const handleInputChange = (e) => {
            setEmail(e.target.value)
        }


        return (
            <div>
                {
                    cart.length ? cart.map(el =>
                        <div className="card">
                            <p >{`${el.category} ${el.brand} ${el.model}`}</p>
                            <img src={el.image} alt={el.model} className="img-fluid col" />
                            <p >price: ${el.price}</p>
                        </div>
                    ) : <p>You don't add any product...</p>
                }
                <form onSubmit={handleSubmit} className="card card-body" style={{ width: '25rem' }}>
                    <div className="form-group">
                        <input type='email' name='email' onChange={(e) => handleInputChange(e)}></input>
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

