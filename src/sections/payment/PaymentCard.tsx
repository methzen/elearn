// @mui
import { Typography, Stack } from '@mui/material';
import { CardElement } from '@stripe/react-stripe-js';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------
interface PaymentCardProps {
  handleSubmit: (e:any)=> void;
  errorMessage: string;
  isLoading: boolean;
}


export default function PaymentCard({ 
  handleSubmit,
  errorMessage,
  isLoading
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
        }
  
  return (
    <div>
      <Typography variant="h6" sx={{mt:3}}>Enter your credit card info</Typography>
      <form onSubmit={handleSubmit}>
      <Stack spacing={5} mt={5}>
        <div style={{
          border: "1px solid #919EAB",
          borderRadius: "6px",
          padding: "16px 12px",
          background: "#fff"
          }}>
      <CardElement options={{...css_style}}/>
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
      </form>
      
    </div>
  );
}
