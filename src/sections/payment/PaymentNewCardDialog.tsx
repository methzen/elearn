import { useState } from 'react';
// @mui
import {
  Button,
  Dialog,
  DialogTitle,
  DialogProps,
  DialogActions,
  DialogContent,
} from '@mui/material';
// components
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useAuthContext } from 'src/auth/useAuthContext';
import { StripeCardElement } from '@stripe/stripe-js';
import PaymentCard from './PaymentCard';
import { attachPaymentMethods } from 'src/api/stripe';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  onClose: VoidFunction;
  mutate?: () => void;
}

export default function PaymentNewCardDialog({ onClose, mutate, ...other }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { user } = useAuthContext();

  const handleStripeSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) {
      return;
    }
    try {
      const cardElement = elements.getElement(CardElement);
      // save the user payment method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement as StripeCardElement,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      });
      if (error) {
        setIsLoading(false);
        setErrorMessage(error.message as string);
        return;
      }
      await attachPaymentMethods(paymentMethod.id);
      setIsLoading(false);
      mutate && mutate();
      onClose();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
      return;
    }
  };

  return (
    <>
      <Dialog onClose={onClose} {...other}>
        <DialogTitle> Add new card </DialogTitle>
        <DialogContent sx={{ overflow: 'unset' }}>
          <PaymentCard
            large={true}
            ButtonText="Add New Card"
            Title=""
            handleSubmit={handleStripeSubmit}
            errorMessage={errorMessage}
            isLoading={isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
