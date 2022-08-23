import React from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement } from '@stripe/react-stripe-js'
import './payment.css'

const index = () => {

    const stripePromise = loadStripe('pk_test_51LZyQiBbFJpttBpIyQwwHOie1Es3EW1nrUBgeyu37AsshkUlYiOd0MgmQzvYOZfzXu3B027tMW4kqrcrCXGfuH9i00xiKfxU6H')

    const CheckoutForm = () => {
        return <form>
            <CardElement />
        </form>
    }

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}

export default index

