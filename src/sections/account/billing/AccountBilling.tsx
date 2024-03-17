// @mui
import { Box, Grid, Card, Button, Typography, Stack, Divider } from '@mui/material';
//
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';
import { useEffect, useState } from 'react';
import {
  updateSubscription,
  getCustomerInvoices,
  getCustomerPaymentMethods,
  getSubscription,
} from 'src/api/stripe';
import { CustomerStripeInvoice, StripePaymentMethod, StripeSubscription } from 'src/@types/stripe';
import { useSnackbar } from '../../../components/snackbar';
// ----------------------------------------------------------------------

export default function AccountBilling() {
  const { enqueueSnackbar } = useSnackbar();
  const [subscriptions, setSubscriptions] = useState<StripeSubscription[]>([]);
  const [hasMorsSubs, setHasMoreSubs] = useState(false);
  const [invoices, setInvoices] = useState<CustomerStripeInvoice[]>([]);
  const [hasMoreInvoice, setHasMoreInvoice] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<StripePaymentMethod[]>([]);
  const getData = async () => {
    const { has_more, data } = await getSubscription();
    if (data) {
      setSubscriptions(data);
      setHasMoreSubs(!!has_more);
    }
    const response = await getCustomerInvoices();
    if (response) {
      setInvoices(response.data);
      setHasMoreInvoice(!!response.has_more);
    }
    const res = await getCustomerPaymentMethods();
    if (res) {
      setPaymentMethods(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      const { has_more, data } = await updateSubscription(id, 'cancel');
      if (data) {
        setSubscriptions(data);
      }
      enqueueSnackbar('Success!');
    } catch (err) {
      enqueueSnackbar('Failed!', { variant: 'error' });
    }
  };

  const handleReactivate = async (id: string) => {
    try {
      const { has_more, data } = await updateSubscription(id, 'reactivate');
      if (data) {
        setSubscriptions(data);
      }
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
                      {subscription.items.data[0].plan.amount / 100}
                      {subscription.currency === 'eur' && '€'} /
                      {subscription.items.data[0].plan.interval}
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
          <AccountBillingPaymentMethod paymentMethods={paymentMethods} mutate={getData} />
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
