// next
import Head from 'next/head';
// @mui
import { Box, Grid, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// layouts
import SimpleLayout from '../layouts/simple';
// sections
import { PaymentCard, PaymentSummary, SubscriptionPlans } from '../sections/payment';
import { Price, RecurringString } from 'src/@types/stripe';
import { useEffect, useState } from 'react';
import AuthSignupForm from 'src/sections/auth/AuthSignupForm';
import { InnerCirclePlan } from 'src/@types/innerCircle';
import getPaymentPlans from 'src/api/getPaymentPlans';
import { useRouter } from 'next/router';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { object } from 'yup';

// ----------------------------------------------------------------------

PaymentPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function PaymentPage() {
  const {query} = useRouter()
  const isDesktop = useResponsive('up', 'md');
  const [paymentPlans, setPaymentPlans] = useState<InnerCirclePlan[]>()
  const [susbcriptionName, setSubscriptionName] = useState("")
  const [selectedPrice, setSelectedPrice] = useState<Price|null>(null)
  const [hiddenPrice, setHiddenPrice] = useState<Price|null>(null)
  const [trial, setTrial] = useState(false)

  useEffect(()=>{
    const getPlans = async () => {
      const plans: InnerCirclePlan[] = await getPaymentPlans()
      if(plans){
        setPaymentPlans(plans)
      }
    }
    getPlans()
  }, [])

  useEffect(()=>{
    if(query["p"] && paymentPlans){
      const seletedP = paymentPlans.find(plan => plan.subscription===query.p) as InnerCirclePlan
      setSubscriptionName(seletedP.subscription)
      setSelectedPrice(
        {
          interval: "month",
          price: seletedP.prices.month.amount,
          currency: "usd",
          stripe_price_id: seletedP.prices.month.id,
        }
      )
      setHiddenPrice({
        interval: "year",
        price: seletedP.prices.year.amount,
        currency: "usd",
        stripe_price_id: seletedP.prices.year.id,
      })
    }
    if(Object.keys(query).includes("trial")){
      setTrial(true)
    }
  }, [query, paymentPlans])

  const handleChange = () => {
    const currentPrice = selectedPrice
    setSelectedPrice(hiddenPrice)
    setHiddenPrice(currentPrice)
}

  const inputData = {
    firstName: 'Mouhamadou',
    lastName:'Dia',
    email:'email@medadom.com',
    password: '',
    company: 'VCP'
  }
  const handleChangeMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    const selectedP = paymentPlans?.find(p=>p.subscription===value) as InnerCirclePlan
    setSubscriptionName(value);
    setHiddenPrice({
      interval: "year",
      price: selectedP.prices.year.amount,
      currency: "usd",
      stripe_price_id: selectedP.prices.year.id,
    })

    setSelectedPrice({
      interval: "month",
      price: selectedP.prices.month.amount,
      currency: "usd",
      stripe_price_id: selectedP.prices.month.id,
    })
  };

  if(!query || !paymentPlans) return <LoadingScreen/>

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
        Start Using Your Innercircle Account Today!
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
        Tell us about you and your business
        </Typography>

        <Grid container spacing={isDesktop ? 3 : 5}>
        <Grid item xs={12} md={4}>
            <PaymentSummary
              trial={trial}
              handleChange={handleChange}  
              price={selectedPrice && selectedPrice} 
              selection={!!selectedPrice && selectedPrice.interval===RecurringString.yearly}
              plans={paymentPlans.length}
              subscriptionName={susbcriptionName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              gap={5}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)',
              }}
              sx={{
                p: { md: 4 },
                borderRadius: 2,
                border: (theme) => ({
                  md: `dashed 1px ${theme.palette.divider}`,
                }),
              }}
            > 
            <SubscriptionPlans
                plans={paymentPlans}
                selectPlan={handleChangeMethod}
                susbcriptionName={susbcriptionName}
            />
            <AuthSignupForm inputData={inputData} viewOnly={true}/>
            <PaymentCard
                handleSubmit={()=>console.log('submit')}
                errorMessage={""}
                isLoading={false}
            />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
