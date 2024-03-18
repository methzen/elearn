// @mui
import { Box, Grid, Card, Button, Typography, Stack, Divider } from '@mui/material';
//
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';
import { useState } from 'react';
import { updateSubscription } from 'src/api/stripe';
import { CustomerStripeInvoice, StripePaymentMethod, StripeSubscription } from 'src/@types/stripe';
import { useSnackbar } from '../../../components/snackbar';
import { ProfileData } from 'src/@types/user';
// ----------------------------------------------------------------------

export default function AccountBilling({
  ProfileData,
  mutate,
}: {
  ProfileData: ProfileData;
  mutate: () => void;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [subscriptions] = useState<StripeSubscription[]>(ProfileData.subscriptions.data);
  const [invoices] = useState<CustomerStripeInvoice[]>(ProfileData.invoices.data);
  const [hasMoreInvoice] = useState(ProfileData.invoices.has_more);
  const [paymentMethods] = useState<StripePaymentMethod[]>(ProfileData.paymentMethods.data);

  const handleCancel = async (id: string) => {
    try {
      await updateSubscription(id, 'cancel');
      mutate();
      enqueueSnackbar('Success!');
    } catch (err) {
      enqueueSnackbar('Failed!', { variant: 'error' });
    }
  };

  const handleReactivate = async (id: string) => {
    try {
      await updateSubscription(id, 'reactivate');
      mutate();
      enqueueSnackbar('Success!');
    } catch (error) {
      enqueueSnackbar('Failed!', { variant: 'error' });
    }
  };

  const getMoreInvoices = async () => {
    console.log('show more invoices to user');
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Typography
              variant="overline"
              sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
            >
              Subscriptions
            </Typography>
            <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
              {subscriptions.length >= 1 &&
                subscriptions.map((subscription) => (
                  <Stack key={subscription.id} spacing={1}>
                    <Typography variant="subtitle1">{subscription.description}</Typography>
                    <Typography variant="body2">
                      <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                        Status:
                      </Box>
                      {subscription.status}
                    </Typography>

                    <Typography variant="body2">
                      <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                        Price:
                      </Box>
                      {subscription.currency === 'usd' && '$'}
                      {subscription.amount / 100}
                      {subscription.currency === 'eur' && '€'} /{subscription.interval}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                      <Button
                        color={subscription.cancel_at_period_end ? 'success' : 'error'}
                        size="small"
                        onClick={() =>
                          subscription.cancel_at_period_end
                            ? handleReactivate(subscription.id)
                            : handleCancel(subscription.id)
                        }
                      >
                        {subscription.cancel_at_period_end ? 'Reactivate' : 'Cancel'}
                      </Button>
                    </Stack>
                  </Stack>
                ))}
            </Stack>
          </Card>
          <AccountBillingPaymentMethod paymentMethods={paymentMethods} mutate={mutate} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory
          has_more={hasMoreInvoice}
          getMoreInvoices={getMoreInvoices}
          invoices={invoices}
        />
      </Grid>
    </Grid>
  );
}
