// @mui
import { Typography, Stack } from '@mui/material';
import { CardElement } from '@stripe/react-stripe-js';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
interface PaymentCardProps {
  large?: boolean;
  ButtonText: string;
  Title: string;
  handleSubmit: (e: any) => void;
  errorMessage: string;
  isLoading: boolean;
}

export default function PaymentCard({
  handleSubmit,
  errorMessage,
  isLoading,
  Title,
  ButtonText,
  large,
}: PaymentCardProps) {
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
  const width = large ? { width: 500 } : {};
  return (
    <Stack sx={{ ...width }}>
      <Stack spacing={2}>
        <Typography variant="h6">{Title}</Typography>
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
          {errorMessage && (
            <Typography align="justify" sx={{ color: 'red' }}>
              {errorMessage}
            </Typography>
          )}
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
            {ButtonText}
          </LoadingButton>
        </Stack>
        <Stack alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="eva:shield-fill" sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle2">
              Secure credit card collection powered by Stripe
            </Typography>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
