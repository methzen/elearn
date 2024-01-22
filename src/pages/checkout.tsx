import {Elements} from '@stripe/react-stripe-js';
import {Appearance, StripeElementsOptions, loadStripe} from '@stripe/stripe-js';
import { STRP_PK } from '../config-global';
import { useEffect, useState } from 'react';
import CheckoutForm from 'src/components/checkout';
import checkout from 'src/api/checkout';
import Head from 'next/head';
import { useTheme } from '@mui/material/styles';


// @mui
import { Box, Grid, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
import LoginLayout from 'src/layouts/login/LoginLayout';
// layouts

// sections
// import { PaymentSummary, PaymentMethods, PaymentBillingAddress } from '../sections/payment';

// ----------------------------------------------------------------------


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRP_PK as string);


// Make sure to call loadStripe outside of a component’s render to avoid

export default function PaymentPage() {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const data = JSON.stringify({ items: [{ id: "xl-tshirt" }] })
    checkout(data)
      .then((res) => res.data)
      .then((d) => setClientSecret(d.clientSecret));
  }, []);
console.log('client data', clientSecret);
  const appearance : Appearance = {
    theme: 'stripe',

  variables: {
    colorPrimary: theme.palette.primary.main,
    colorBackground: theme.palette.background.paper,
    colorText: theme.palette.text.primary,
    colorDanger: theme.palette.error.main,
    fontFamily: 'Ideal Sans, system-ui, sans-serif',
    spacingUnit: '5px',
    borderRadius: '4px',
    // See all possible variables below
  }
  };
  const options : StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (


<>
<Head>
  <title> Checkout</title>
</Head>

<LoginLayout>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
</LoginLayout>
</>
  );
}