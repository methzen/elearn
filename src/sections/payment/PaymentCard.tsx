// @mui
import { Typography, TextField, Stack } from '@mui/material';
import { CardElement} from '@stripe/react-stripe-js';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------
interface PaymentCardProps {
  handleSubmit: (e:any) => void;
  errorMessage: string|null
  isLoading?: boolean;
  groupName?: string;
  handleGroupNameChange: (value:string) => void;
}

export default function PaymentCard({ 
  handleSubmit,
  errorMessage,
  isLoading,
  groupName,
  handleGroupNameChange,
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
      <Typography variant="h6">Billing Address</Typography>
      
      <form onSubmit={handleSubmit}>
      <Stack spacing={5} mt={5}>
        <TextField fullWidth label="Class Name" value={groupName} 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleGroupNameChange(event.target.value)}/>
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
          size="large" 
          type="submit" 
          variant="contained" 
          sx={{ mt: 5, mb: 3 }}>
          Upgrade My Plan
        </LoadingButton>
        {errorMessage && <div>{errorMessage}</div>}
      </Stack>
      </form>
      
    </div>
  );
}
