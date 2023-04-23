import {Elements} from '@stripe/react-stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import {Appearance, StripeElementsOptions, loadStripe} from '@stripe/stripe-js';
import { STRP_PK } from '../config-global';
import { useEffect, useState } from 'react';
import CheckoutForm from 'src/components/checkout';
import checkout from 'src/api/checkout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRP_PK as string);


// Make sure to call loadStripe outside of a component’s render to avoid

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const data = JSON.stringify({ items: [{ id: "xl-tshirt" }] })
    checkout(data)
      .then((res) => res.data)
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance : Appearance = {
    theme: 'stripe',
  };
  const options : StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}