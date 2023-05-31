import {Elements} from '@stripe/react-stripe-js';
import {Appearance, StripeElementsOptions, loadStripe} from '@stripe/stripe-js';
import { STRP_PK } from '../config-global';
import { useEffect, useState } from 'react';
import CheckoutForm from 'src/components/checkout';
import checkout from 'src/api/checkout';
import Head from 'next/head';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from "@mui/lab";


// @mui
import { Box, Grid, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
import LoginLayout from 'src/layouts/login/LoginLayout';
import subscibe from 'src/api/subscribe';
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

  const CustomerId="pi_3N0fqnLpx5FbhsTK0SCtdq6O_secret_X1ANhP0nGgUDt0DrDS7iV1iZ5"
  const PriceId="price_1N03yCLpx5FbhsTKx2OdoWIq"

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     const data = JSON.stringify({ CustomerId, PriceId })
//     subscibe(data)
//       .then((res) => res.data)
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);


  const handleSubmit = async () => {
    console.log('submitted')
    const data = JSON.stringify({ CustomerId, PriceId })
    const response = await subscibe(data);
    console.log("response: " + response)
  }
  return (


<>
<Head>
  <title> Checkout</title>
</Head>

<form id="payment-form" onSubmit={handleSubmit}>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"

        sx={{
          mt: '30px',
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Pay now
      </LoadingButton>

    </form>
</>
  );
}