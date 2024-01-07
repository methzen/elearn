// next
import Head from 'next/head';
// @mui
import { Box, Grid, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// layouts
import SimpleLayout from '../../../layouts/simple';
// sections
import { PaymentSummary, PaymentCard } from '../../../sections/payment';
import { useEffect, useState } from 'react';
import { createSubscription, getGroupSubscriptionPrice } from 'src/api/stripe';
import { useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';

// ----------------------------------------------------------------------

PaymentPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function PaymentPage() {
  const isDesktop = useResponsive('up', 'md');

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
              box
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
