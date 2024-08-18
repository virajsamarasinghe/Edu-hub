import React, { useEffect, useState } from 'react';
import { FaPaypal } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
 // Assuming you have a custom hook for axios

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof price !== 'number' || price < 1) {
      console.log("Price is not a number or is less than one");
      return;
    }
    axiosSecure.post('/create-payment-intent', { price })
      .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch(error => {
        console.error("Error fetching client secret:", error);
      });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    // Create card element
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Confirm card payment
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (paymentMethodError) {
      setCardError(paymentMethodError.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: 'anonymous',
            email: 'unknown'
          },
        },
      },
    );

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setCardError(`Your transaction is ${paymentIntent.id}`);
      const paymentInfo = {
        email: 'unknown',
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
      };
      // Handle successful payment (e.g., save payment info, navigate to success page)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {cardError && <div>{cardError}</div>}
      <button type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;