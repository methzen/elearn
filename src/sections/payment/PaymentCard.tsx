// @mui
import { Typography, Stack } from '@mui/material';
import { CardElement } from '@stripe/react-stripe-js';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
interface PaymentCardProps {
  handleSubmit: (e: any) => void;
  errorMessage: string;
  isLoading: boolean;
}

export default function PaymentCard({ handleSubmit, errorMessage, isLoading }: PaymentCardProps) {
  const theme = useTheme();
  const css_style = {
    style: {
      base: {
        iconColor: '#202124',
        color: theme.palette.grey[600],
        fontWeight: '500',
        fontFamily: theme.typography.fontFamily,
        fontSize: `20px`,
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: theme.palette.grey[100],
        },
      },
      invalid: {
        iconColor: theme.palette.error.main,
        color: theme.palette.error.main,
      },
    },
  };

  return (
    <div>
      <Stack spacing={5}>
        <Typography variant="h6">Enter your credit card info</Typography>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Stack spacing={5} mt={5}>
          <div
            style={{
              border: '1px solid #919EAB',
              borderRadius: '6px',
              padding: '16px 12px',
              background: '#fff',
            }}
          >
            <CardElement options={{ ...css_style }} />
          </div>
          <LoadingButton
            disabled={isLoading}
            fullWidth
            type="submit"
            variant="contained"
            color="inherit"
            size="large"
            sx={{
              bgcolor: 'text.primary',
              color: (t) => (t.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'text.primary',
                color: (t) => (t.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              },
            }}
          >
            Subscribe
          </LoadingButton>
          {errorMessage && <div>{errorMessage}</div>}
        </Stack>
        <Stack alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="eva:shield-fill" sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle2">
              Secure credit card payment powered by Stripe
            </Typography>
          </Stack>
        </Stack>
      </form>
    </div>
  );
}
