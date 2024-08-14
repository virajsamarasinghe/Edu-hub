import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { FaPaypal } from 'react-icons/fa';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
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
            name: user?.displayName || 'anonymous',
            email: user?.email || 'unknown'
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
        email: user.email,
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "order pending",
        itemName: cart.map(item => item.name),
        cartItems: cart.map(item => item._id),
        MenuItems: cart.map(item => item.menuItemId)
      }
      console.log(paymentInfo);
      // Send payment info to backend
      axiosSecure.post('/payments', paymentInfo)
        .then(res => {
          console.log(res.data);
          alert("Payment successful!");
          navigate('/order');
        })
        .catch(error => {
          console.error("Error sending payment info:", error);
        });
    }
  };

  const scrollToShopSection = () => {
    // Define scrollToShopSection function or remove if not used
  };

  return (
    
    <div className="max-w-screen-2xl container mx-auto xl:px-20 px-4">
      
      
      <div>
      
     
      

      <div className='flex flex-col sm:flex-row justify-start items-start gap-8 py-10'>
        {/* Left side */}
    

        <div className='md:w-1/2 w-full space-y-3'>
          <h4 className='text-lg font-semibold'>Order Summary</h4>
          <p>Total Price: Rs.{price}</p>
          <p>Number of Items: {cart.length}</p>
        </div>

        {/* Right side */}
        <div className='md:w-1/3 w-full space-y-5 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8'>
          <h4 className='text-lg font-semibold'>Process Your Payment!</h4>
          <h5 className='font-medium'>Credit/Debit Cards</h5>
          {/* Stripe form */}
          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <button type="submit" disabled={!stripe} className='btn btn-sm mt-5 bg-primary w-full text-white'>
              Pay
            </button>
          </form>

          {cardError && <p className='text-red italic text-xs mt-3'>{cardError}</p>}

          {/* PayPal Options */}
          <div className='mt-5 text-center'>
            <hr />
            <button type="button" className='btn btn-sm mt-5 bg-orange-500 text-white'>
              <FaPaypal /> Pay with PayPal
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
