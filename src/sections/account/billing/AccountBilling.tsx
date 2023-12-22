// @mui
import { Box, Grid, Card, Button, Typography, Stack, Divider } from '@mui/material';
// @types
import {
  IUserAccountBillingCreditCard,
  IUserAccountBillingAddress,
  IUserAccountBillingInvoice,
} from 'src/@types/user';
//
import AccountBillingAddressBook from './AccountBillingAddressBook';
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';
import { useEffect, useState } from 'react';
import { cancelSubscription, getCustomerInvoices, getSubscription } from 'src/api/stripe';
import { CustomerStripeInvoice, StripeSubscription } from 'src/@types/stripe';
import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

type Props = {
  cards: IUserAccountBillingCreditCard[];
  invoices?: IUserAccountBillingInvoice[];
  addressBook: IUserAccountBillingAddress[];
};

export default function AccountBilling({ cards, addressBook }: Props) {
  const [subscriptions, setSubscriptions] = useState<StripeSubscription[]>([])
  const [hasMorsSubs, setHasMoreSubs] = useState(false)
  const [invoices, setInvoices] = useState<CustomerStripeInvoice[]>([])
  const [hasMoreInvoice, setHasMoreInvoice] = useState(false)

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
    };
    getData();
  }, [])

  const handleCancel = async (id:string) =>{
    const {has_more, data} = await cancelSubscription(id)
    if (data){
      setSubscriptions(data)
    }
  }

  const getMoreInvoices = async () =>{
    console.log('show more invoices to user')
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <Typography
                    variant="overline"
                    sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
                  >
                    Your subscription
          </Typography>

        <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
        { subscriptions.length >= 1 && subscriptions.map((subscription) => (
          <Stack key={subscription.id} spacing={1}>
            <Typography variant="subtitle1">{subscription.description}</Typography>

            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                active:
              </Box>
              {subscription.status!=="active"? "false": "true"}
            </Typography>

            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                amount:
              </Box>
              {`${subscription.items.data[0].plan.amount/100} per ${subscription.items.data[0].plan.interval}`}
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button 
              color="error"
              size="small"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={()=>handleCancel(subscription.id)}
              disabled={subscription.status==="canceled"}
              >
                {subscription.status==="canceled"? "canceled": "cancel"}
              </Button>

              <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />}>
                Edit
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
                           
      </Card>

          <AccountBillingPaymentMethod cards={cards} />

          <AccountBillingAddressBook addressBook={addressBook} />
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
