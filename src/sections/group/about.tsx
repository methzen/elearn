// next
// @mui
import { Grid, Container, Typography, Button, Paper, Link } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
// layouts
import AboutCard from 'src/sections/group/aboutCard';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Stack } from '@mui/system';
import AuthRegisterForm from 'src/sections/auth/AuthRegisterForm';
import AuthLoginForm from 'src/sections/auth/AuthLoginForm';
import { GroupAboutProps, GroupCheckoutContext } from 'src/auth/CircleGuard';
import { PaymentCard, PaymentSummary } from '../payment';
import { Price, RecurringString } from 'src/@types/stripe';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createGroupSubscription } from 'src/api/stripe';
import { StripeCardElement } from '@stripe/stripe-js';
import updateUserGroupStatus from 'src/api/updateUserGroupStatus';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function AuthenticateDialog({ open, cancel }: any) {
  const isDesktop = useResponsive('up', 'sm');
  const [register, setRegister] = useState(true);

  const fullWidth = isDesktop ? 700 : 400;
  return (
    <BootstrapDialog onClose={cancel} aria-labelledby="customized-dialog-title" open={open}>
      <Paper
        sx={{
          width: `${fullWidth}px`,
          top: 90,
          right: `calc((100% - ${fullWidth}px)/2)`,
          p: 4,
          margin: '0px auto',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {register ? (
          <>
            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
              <Typography variant="h4">Create an account</Typography>

              <Stack direction="row" spacing={0.5}>
                <Typography variant="body2"> Already have an account? </Typography>
                <Link
                  underline="always"
                  variant="subtitle2"
                  onClick={() => setRegister(false)}
                  sx={{ cursor: 'pointer' }}
                >
                  Sign in
                </Link>
              </Stack>
            </Stack>
            <AuthRegisterForm />
            <Typography
              component="div"
              sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
            >
              {'By signing up, I agree to '}
              <Link underline="always" color="text.primary">
                Terms of Service
              </Link>
              {' and '}
              <Link underline="always" color="text.primary">
                Privacy Policy
              </Link>
              .
            </Typography>
          </>
        ) : (
          <>
            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
              <Typography variant="h4">Sign in to Minimal</Typography>

              <Stack direction="row" spacing={0.5}>
                <Typography variant="body2">New user?</Typography>

                <Link
                  underline="always"
                  variant="subtitle2"
                  onClick={() => setRegister(true)}
                  sx={{ cursor: 'pointer' }}
                >
                  Create an account
                </Link>
              </Stack>
            </Stack>
            <AuthLoginForm />
          </>
        )}
      </Paper>
    </BootstrapDialog>
  );
}

function About() {
  const { isAuthenticated, user } = useAuthContext();
  const value = useContext(GroupCheckoutContext);
  const group = value?.group as GroupAboutProps;
  const plans = group.plans;
  const [selectedPrice, setSelectedPrice] = useState<Price | null>(
    plans.length > 0 ? plans[0] : null
  );
  const [hiddenPrice, setHiddenPrice] = useState<Price | null>(
    plans.length > 1 ? plans[1] : plans[0]
  );
  const [open, setOpen] = useState(false);
  const [canCheckOut, setCanCheckOut] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [stripePaymentIntent, setStripePaymentIntent] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setOpen(false);
    }
  }, [isAuthenticated, user]);

  const { push } = useRouter();

  const handleJoin = () => {
    if (isAuthenticated && user) {
      if (group.by === user.id) {
        // user is the owner of this group get them in the group admin page
        push(PATH_DASHBOARD.group.admin(group.id));
      }
      setCanCheckOut(true);
    } else {
      setOpen(true);
      console.log('No user we have to create an account...');
    }
  };

  const handleChange = () => {
    const currentPrice = selectedPrice;
    setSelectedPrice(hiddenPrice);
    setHiddenPrice(currentPrice);
  };

  const handleStripeSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements || !selectedPrice) {
      return;
    }

    const { subscriptionId, clientSecret } = await createGroupSubscription(
      selectedPrice.stripe_price_id,
      selectedPrice.group
    );
    if (!clientSecret) {
      setErrorMessage('Subscription has failed...');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    // Use card Element to tokenize payment details
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret as string, {
      setup_future_usage: 'off_session',
      receipt_email: user?.email,
      payment_method: {
        card: cardElement as StripeCardElement,
        billing_details: {
          name: user?.displayName,
        },
      },
    });

    if (error) {
      // show error and collect new card details.
      setErrorMessage(error.message as string);
      setIsLoading(false);
      return;
    }
    if (paymentIntent) {
      await updateUserGroupStatus(subscriptionId);
    }
    setStripePaymentIntent(paymentIntent);
    setIsLoading(false);
  };

  useEffect(() => {
    if (stripePaymentIntent && selectedPrice) {
      push(PATH_DASHBOARD.group.community(selectedPrice.group));
    }
  }, [stripePaymentIntent, push, selectedPrice]);

  return (
    <Container
      sx={{
        pt: 15,
        pb: 10,
        minHeight: 1,
      }}
    >
      <AuthenticateDialog cancel={() => setOpen(false)} open={open} />
      <Grid container spacing={5}>
        <Grid item xs={12} md={7}>
          <AboutCard group={group} />
        </Grid>
        <Grid item xs={12} md={5}>
          <PaymentSummary
            handleChange={handleChange}
            price={selectedPrice && selectedPrice}
            selection={!!selectedPrice && selectedPrice.interval === RecurringString.yearly}
            plans={group.plans.length}
          />
          {!canCheckOut ? (
            <Button
              variant="contained"
              onClick={handleJoin}
              fullWidth
              color="inherit"
              size="large"
              sx={{
                bgcolor: 'text.primary',
                mt: 3,
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'text.primary',
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                },
              }}
            >
              {isAuthenticated && user?.id === group.by ? 'GET IN' : 'JOIN CIRCLE'}
            </Button>
          ) : selectedPrice ? (
            <PaymentCard
              handleSubmit={handleStripeSubmit}
              errorMessage={errorMessage}
              isLoading={isLoading}
            />
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
