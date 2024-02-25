import Head from 'next/head';
// @mui
import { Box, Switch, Container, Typography, Stack } from '@mui/material';
// sections
import { PricingPlanCard } from '../sections/pricing';
import MainLayout from 'src/layouts/main/MainLayout';
import HomeHero from 'src/sections/home/Hero';
import HomeMinimal from 'src/sections/home/HomeMinimal';
import { useEffect, useState } from 'react';
import getPaymentPlans from 'src/api/getPaymentPlans';
import { InnerCirclePlan } from 'src/@types/innerCircle';
// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout pageName="home"> {page} </MainLayout>
);

// ----------------------------------------------------------------------

export default function HomePage() {
  const [paymentPlans, setPaymentPlans] = useState<InnerCirclePlan[]>();
  const [checked, setCheck] = useState(false);

  useEffect(() => {
    const getPlans = async () => {
      const plans: InnerCirclePlan[] = await getPaymentPlans();
      if (plans) {
        setPaymentPlans(plans);
      }
    };
    getPlans();
  }, []);

  return (
    <>
      <Head>
        <title> Welcome to Innercircle</title>
      </Head>
      <HomeHero />
      <HomeMinimal />
      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          Flexible plans for your
          <br /> community&apos;s size and needs
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary' }}>
          Choose your plan and make modern online conversation magic
        </Typography>

        <Box sx={{ my: 5 }}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Typography variant="overline" sx={{ mr: 1.5 }}>
              MONTHLY
            </Typography>

            <Switch
              checked={checked}
              onChange={(e: React.ChangeEvent) => setCheck(!checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              YEARLY (save 10%)
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            align="right"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            * Plus applicable taxes
          </Typography>
        </Box>

        <Box gap={3} display="grid" gridTemplateColumns={{ md: 'repeat(2, 1fr)' }}>
          {paymentPlans &&
            paymentPlans.map((card, index) => (
              <PricingPlanCard
                key={card.subscription}
                selected={checked ? 'year' : 'month'}
                card={card}
                index={index}
              />
            ))}
        </Box>
      </Container>
    </>
  );
}
