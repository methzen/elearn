// @mui
import { Switch, Divider, Typography, Stack, Box, BoxProps } from '@mui/material';
import { Price } from 'src/@types/stripe';
// components
import Label from '../../components/label';

// ----------------------------------------------------------------------

interface PaymentSummuryProps extends BoxProps{
  trial?: boolean;
  handleChange: () =>void;
  price: Price | null;
  selection: boolean;
  plans: number;
  subscriptionName?: string
}

const dateString = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}

const FourtheenDayInMiliseconds = 14*24*60*60*1000
export default function PaymentSummary({ trial=false, handleChange, plans, price, selection, subscriptionName, sx, ...other}: PaymentSummuryProps) {
  const multiPlans = plans > 1
  const showPrice = price && plans >= 1 ? (
    price.currency === 'usd' ? `$${price?.price}`: `${price?.price}€`
  ): false

  const trialEnd = new Date(Date.now() + FourtheenDayInMiliseconds)
  const trialYear = trialEnd.getFullYear()
  const trialEndDay = trialEnd.getDate()
  const month = trialEnd.getMonth()
  const trialEndMonth = Object.values(dateString)[month]

  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" sx={{ mb: 5 }}>
        Price details
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Subscription
          </Typography>

          <Label color="success">{showPrice? (subscriptionName? subscriptionName.toUpperCase(): 'PREMIUM') : 'FREE'}</Label>
        </Stack>
        {showPrice && <>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Billed ${price?.interval}ly`}
          </Typography>
          {
          multiPlans && <Switch
            checked={selection}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          }
        </Stack>
        <Stack spacing={1} direction="row" justifyContent="flex-end">
          <Typography variant="h2">{showPrice}</Typography>
          <Typography component="span" sx={{ mb: 1, alignSelf: 'center', color: 'text.secondary' }}>
          {`/${price?.interval}`}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Total Billed</Typography>
          <Typography variant="h6">{showPrice}</Typography>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        </>}
      </Stack>

      <Stack spacing={1} sx={{mt:2}}>
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">You can cancel anytime. </Typography>
        </Stack>

        {trial && <Typography variant="caption" sx={{ color: 'text.secondary'}}>
          You won't be charged until your free trial ends on {trialEndMonth} {trialEndDay}, {trialYear}.
        </Typography>}
      </Stack>
    </Box>
  );
}
