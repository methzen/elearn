// next
import Head from 'next/head';
// @mui
import { Box, Grid, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// layouts
import SimpleLayout from '../layouts/simple';
// sections
import { PaymentSummary, PaymentCard } from '../sections/payment';
import { useEffect, useState } from 'react';
import { createSubscription, getGroupSubscriptionPrice } from 'src/api/stripe';
import { useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';

// ----------------------------------------------------------------------

PaymentPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------
type Recurring = "month" | "year"

enum RecurringString {
  yearly = "year",
  monthly = "month"
}

type Price = {
  recurring: Recurring
  amount: number
  id: string
}

export default function PaymentPage() {
  const isDesktop = useResponsive('up', 'md');
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPrice, setSelectedPrice] = useState<Price>()
  const [hiddenPrice, setHiddenPrice] = useState<Price>()
  const [errorMessage, setErrorMessage] = useState<string|null>(null);
  const [paymentIntent, setPaymentIntent] = useState<any>();
  const [groupName, setGroupName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange =()=> {
    const currentPrice = selectedPrice
    setSelectedPrice(hiddenPrice)
    setHiddenPrice(currentPrice)
  }

  useEffect(()=>{
    const fetchPrices = async () => {
      const prices = await getGroupSubscriptionPrice();
      console.log(prices)
      setSelectedPrice(prices.month)
      setHiddenPrice(prices.year)
    };
    fetchPrices();
  }, [])

  const handleSubmit = async (e:any) =>{
    e.preventDefault();
    setIsLoading(true)
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return '';
    }
    const {subscriptionId, clientSecret} = await createSubscription(selectedPrice?.id as string)
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
      payment_method: {
        card: cardElement as StripeCardElement,
        billing_details: {
          name: "Arna Dia",
        }
      }
    });

    if(error) {
      // show error and collect new card details.
      setErrorMessage(error.message as string);
      setIsLoading(false)
      return;
    }
    console.log('paymentIntent', paymentIntent)
    setPaymentIntent(paymentIntent);
    console.log("Subscription has succeeded.", groupName)
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title> Group Subscription | Payment </title>
      </Head>

      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          Create your first class
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
          Professional plan is right for you.
        </Typography>

        <Grid container spacing={isDesktop ? 3 : 5}>
          <Grid item xs={12} md={6}>
            {selectedPrice &&
            <PaymentSummary 
              handleChange={handleChange}  
              price={selectedPrice} 
              selection={selectedPrice.recurring===RecurringString.yearly}/>}
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              gap={5}
              display="grid"
              sx={{
                p: { md: 5 },
                borderRadius: 2,
                border: (theme) => ({
                  md: `dashed 1px ${theme.palette.divider}`,
                }),
              }}
            >
              <PaymentCard 
                handleSubmit={handleSubmit}
                errorMessage={errorMessage}
                groupName={groupName}
                isLoading={isLoading}
                handleGroupNameChange={(name)=>setGroupName(name)}/>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
