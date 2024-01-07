// @mui
import { Box, Grid, Card, Button, Typography, Stack, Divider } from '@mui/material';
//
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';
import { useEffect, useState } from 'react';
import { cancelSubscription, getCustomerInvoices, getCustomerPaymentMethods, getSubscription } from 'src/api/stripe';
import { CustomerStripeInvoice, StripePaymentMethod, StripeSubscription } from 'src/@types/stripe';


// ----------------------------------------------------------------------

export default function AccountBilling() {
  const [subscriptions, setSubscriptions] = useState<StripeSubscription[]>([])
  const [hasMorsSubs, setHasMoreSubs] = useState(false)
  const [invoices, setInvoices] = useState<CustomerStripeInvoice[]>([])
  const [hasMoreInvoice, setHasMoreInvoice] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<StripePaymentMethod[]>([])

  useEffect(() => {
    const getData = async () => {
      const {has_more, data} = await getSubscription()
      if (data){
        setSubscriptions(data)
        setHasMoreSubs(has_more? true: false)
      }
      const response = await getCustomerInvoices()
      if (response){
        setInvoices(response.data)
        setHasMoreInvoice(response.has_more? true: false)
      }
      const res = await getCustomerPaymentMethods()
      if(res){
        setPaymentMethods(res.data)
      }
    };
    getData();
  }, [])

  const handleCancel = async (id:string) =>{
    const {has_more, data} = await cancelSubscription(id)
    if (data){
      setSubscriptions(data)
    }
  }

  const handleReactivate = async (id:string) =>{
    console.log('usr want to reactivate susbcription')
  }

  const getMoreInvoices = async () =>{
    console.log('show more invoices to user')
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
            Subscriptions
          </Typography>

        <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
        { subscriptions.length >= 1 && subscriptions.map((subscription) => (
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
              {subscription.currency==='usd' && '$'}{subscription.items.data[0].plan.amount/100}{subscription.currency==='eur' && '€'} /{subscription.items.data[0].plan.interval}
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button 
              color={subscription.status==="canceled"? "success": "error"}
              size="small"
              onClick={() => subscription.status==="canceled"? handleReactivate(subscription.id): handleCancel(subscription.id)}
              >
                {subscription.status==="canceled"? "Reactivate subscription": "Cancel subscription"}
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
                           
      </Card>

          <AccountBillingPaymentMethod paymentMethods={paymentMethods} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory
          has_more={hasMoreInvoice}
          getMoreInvoices={getMoreInvoices}
          invoices={invoices} />
      </Grid>
    </Grid>
  );
}
