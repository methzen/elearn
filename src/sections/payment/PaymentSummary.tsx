// @mui
import { Switch, Divider, Typography, Stack, Box, BoxProps } from '@mui/material';
import { Price } from 'src/@types/stripe';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

interface PaymentSummuryProps extends BoxProps{
  handleChange: () =>void;
  price: Price | null;
  selection: boolean;
  plans: number;
}

export default function PaymentSummary({ handleChange, plans, price, selection, sx, ...other}: PaymentSummuryProps) {
  const multiPlans = plans > 1
  const showPrice = price && plans >= 1 ? (
    price.currency === 'usd' ? `$${price?.price}`: `${price?.price}€`
  ): false

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
        Subscription details
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Subscription
          </Typography>

          <Label color="success">{showPrice? 'PREMIUM': 'FREE'}</Label>
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

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="eva:shield-fill" sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </Box>
  );
}
