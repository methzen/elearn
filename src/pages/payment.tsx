// next
import Head from 'next/head';
// @mui
import { Box, Grid, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// layouts
import SimpleLayout from '../layouts/simple';
// sections
import { PaymentSummary, SubscriptionPlans } from '../sections/payment';
import { Price, RecurringString } from 'src/@types/stripe';
import { useState } from 'react';
import AuthSignupForm from 'src/sections/auth/AuthSignupForm';
import { InnerCirclePlan } from 'src/@types/innerCircle';

// ----------------------------------------------------------------------

PaymentPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export const Plans:InnerCirclePlan[] = [
  {
    subscription: 'Basic',
    icons: ['/assets/icons/payments/ic_paypal.svg'],
    prices: {month: 19.99, year: 99.99},
    caption: 'saving $24 a year',
    lists: [
      { text: '1 course', isAvailable: true },
      { text: 'Community', isAvailable: true },
      { text: '1 moderators', isAvailable: true },
      { text: 'Chat', isAvailable: false },
      { text: 'Live Coaching', isAvailable: false },
    ],
    labelAction: 'choose Basic',
  },
  {
    subscription: 'Premium',
    icons: ['/assets/icons/payments/ic_paypal.svg'],
    prices: {month: 29.99, year: 199.99},
    caption: 'saving $124 a year',
    lists: [
      { text: '1 course', isAvailable: true },
      { text: 'Community', isAvailable: true },
      { text: '4 moderators', isAvailable: true },
      { text: 'Chat', isAvailable: true },
      { text: 'Live Coaching', isAvailable: true },
    ],
    labelAction: 'choose Premium',
  },
];

export default function PaymentPage() {
  const isDesktop = useResponsive('up', 'md');
  const [selectedPlan, setSelectedPlan] = useState<InnerCirclePlan>(Plans[0])
  const [susbcriptionName, setSubscriptionName] = useState(selectedPlan.subscription)

  const [selectedPrice, setSelectedPrice] = useState<Price|null>({
    interval: "month",
    price: selectedPlan.prices.month,
    id: "1",
    currency: "usd",
    stripe_price_id: "string1",
    group: "group1"
  })

  const [hiddenPrice, setHiddenPrice] = useState<Price|null>({
    interval: "year",
    price: selectedPlan.prices.year,
    id: "1",
    currency: "usd",
    stripe_price_id: "string1",
    group: "group1"
  })

  const handleChange = () => {
    const currentPrice = selectedPrice
    setSelectedPrice(hiddenPrice)
    setHiddenPrice(currentPrice)
}

const handleChangeMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = (event.target as HTMLInputElement).value
  console.log('subsname', (event.target as HTMLInputElement).value)
  const selectedP = Plans.find(p=>p.subscription===value) as InnerCirclePlan
  setSelectedPlan(selectedP as InnerCirclePlan)
  setSubscriptionName(value);
  setHiddenPrice({
    interval: "year",
    price: selectedP.prices.year,
    id: "1",
    currency: "usd",
    stripe_price_id: "string1",
    group: "group1"
  })

  setSelectedPrice({
    interval: "month",
    price: selectedP.prices.month,
    id: "1",
    currency: "usd",
    stripe_price_id: "string1",
    group: "group1"
  })
};

  return (
    <>
      <Head>
        <title> Payment | Minimal UI</title>
      </Head>

      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          Let&apos;s finish powering you up!
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
          Professional plan is right for you.
        </Typography>

        <Grid container spacing={isDesktop ? 3 : 5}>
          <Grid item xs={12} md={8}>
         
            <Box
              gap={5}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
              sx={{
                p: { md: 5 },
                borderRadius: 2,
                border: (theme) => ({
                  md: `dashed 1px ${theme.palette.divider}`,
                }),
              }}
            >
              <AuthSignupForm />
              <SubscriptionPlans
                plans={Plans}
                selectPlan={handleChangeMethod}
                susbcriptionName={susbcriptionName}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <PaymentSummary 
              handleChange={handleChange}  
              price={selectedPrice && selectedPrice} 
              selection={!!selectedPrice && selectedPrice.interval===RecurringString.yearly}
              plans={2}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
