import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { StripeError, StripePaymentElementOptions } from "@stripe/stripe-js";
import { LoadingButton } from "@mui/lab";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } : {error : StripeError} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message as string);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions :StripePaymentElementOptions = {

  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={handleChange as any}
      /> */}
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        disabled={isLoading || !stripe || !elements}
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
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}


