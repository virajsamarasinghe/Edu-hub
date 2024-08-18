import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

const Payment = () => {
  

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28'>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={TotalPrice}  />
      </Elements>
    </div>
  );
}

export default Payment;
