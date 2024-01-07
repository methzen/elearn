// @mui
import { Typography, Stack } from '@mui/material';
import { CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { StripeCardElement } from '@stripe/stripe-js';
import { createSubscription } from 'src/api/stripe';
import { Price } from 'src/@types/stripe';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';
import updateUserGroupStatus from 'src/api/updateUserGroupStatus';

// ----------------------------------------------------------------------
interface PaymentCardProps {
  handleSubmit?: (e:any) => void;
  errorMessage?: string|null
  isLoading?: boolean;
  groupName?: string;
  handleGroupNameChange?: (value:string) => void;
  selectedPrice: Price;
}


export default function PaymentCard({ 
  selectedPrice,
}: PaymentCardProps) {
  const theme = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState<string|null>(null);
  const [paymentIntent, setPaymentIntent] = useState<any>();
  const [isLoading, setIsLoading] = useState(false)
  const {push} = useRouter()
  console.log('selectedPrice',selectedPrice)
  const handleSubmitInside = async (e:any) =>{
    e.preventDefault();
    setIsLoading(true)
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const {subscriptionId, clientSecret} = await createSubscription(selectedPrice.stripe_price_id, selectedPrice.group)
    console.log('Here is your client secret', clientSecret)
    if (!clientSecret){
      setErrorMessage("Subscription has faild...");
      return
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use card Element to tokenize payment details
    let { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret as string, {
      setup_future_usage: 'off_session',
      receipt_email: user?.email,
      payment_method: {
        card: cardElement as StripeCardElement,
        billing_details: {
          name: user?.displayName,
        }
      }
    });

    if(error) {
      // show error and collect new card details.
      setErrorMessage(error.message as string);
      setIsLoading(false)
      return;
    }
    if(paymentIntent){
      const userGroup = await updateUserGroupStatus(subscriptionId)
      console.log('userGroup', userGroup)
    }
    console.log('paymentIntent', paymentIntent)
    setPaymentIntent(paymentIntent);
    setIsLoading(false)
  }

  useEffect(() => {
    if(paymentIntent){
      push(PATH_DASHBOARD.group.community(selectedPrice.group))
    }
  }, [paymentIntent])

  const css_style = {
      style: {
        base: {
          iconColor: '#202124',
          color: theme.palette.grey[600],
          fontWeight: '500',
          fontFamily: theme.typography.fontFamily,
          fontSize: `20px`,
          fontSmoothing: 'antialiased',
          ':-webkit-autofill': {
            color: theme.palette.grey[100],
          },
        },
        invalid: {
          iconColor: theme.palette.error.main,
          color: theme.palette.error.main,
        },
      },
        }
  
  return (
    <div>
      <Typography variant="h6" sx={{mt:3}}>Enter your credit card info</Typography>
      
      <form onSubmit={handleSubmitInside}>
      <Stack spacing={5} mt={5}>
        <div style={{
          border: "1px solid #919EAB",
          borderRadius: "6px",
          padding: "16px 12px",
          background: "#fff"
          
          }}>
      <CardElement options={{...css_style}}/>
      </div>
        <LoadingButton
          disabled={isLoading}
          fullWidth 
          type="submit" 
          variant="contained" 
          color="inherit"
          size="large"
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
          >
          Subscribe
        </LoadingButton>
        {errorMessage && <div>{errorMessage}</div>}
      </Stack>
      </form>
      
    </div>
  );
}
