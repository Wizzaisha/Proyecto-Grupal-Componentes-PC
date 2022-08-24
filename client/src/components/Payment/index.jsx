import React from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './payment.css'

const index = () => {

    const p = {
        "image": "https://http2.mlstatic.com/D_NQ_NP_981456-MLA42850006619_072020-O.webp",
        "brand": "MSI",
        "model": "MAG VAMPIRIC 010 TG ARGB",
        "price": 30,
        "description": "Gabinete MSI MAG VAMPIRIC 010 TG ARGB",
        "benchmark": 165,
        "specs": [
            "USB 2.0:2",
            "USB 3.0:1",
            "Audio HD:Si",
            "RGB:No",
            "Factor Mother:Mini ITX - MATX - ATX",
            "Ventiladores:5"
        ],
        "category": "CABINET",
        "stock": 10
    }

    const stripePromise = loadStripe('pk_test_51LZyQiBbFJpttBpIyQwwHOie1Es3EW1nrUBgeyu37AsshkUlYiOd0MgmQzvYOZfzXu3B027tMW4kqrcrCXGfuH9i00xiKfxU6H')

    const CheckoutForm = () => {
        const stripe = useStripe()
        const elements = useElements()

        const handleSubmit = async (e) => {
            e.preventDefault();
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            })
            if (!error) {
                console.log(paymentMethod);
            }
        }

        return (
            <form onSubmit={handleSubmit} className="card card-body" style={{ width: '25rem' }}>
                <p>{`${p.category} ${p.brand} ${p.model}`}</p>
                <img src={p.image} alt={p.model} className="img-fluid" />
                <p>Total to pay : ${p.price}</p>
                <div className="form-group">
                    <CardElement className="form-control" />
                </div>
                <button className="btn btn-success">
                    Buy
                </button>
            </form>
        )
    }

    return (
        <Elements stripe={stripePromise}>
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-4 offset-md-20">
                        <CheckoutForm />
                    </div>
                </div>
            </div>
        </Elements>
    )
}

export default index

