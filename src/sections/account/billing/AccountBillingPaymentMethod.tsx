import { useState } from 'react';
// @mui
import { Card, Stack, Paper, Button, Typography, IconButton } from '@mui/material';
// @types
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
// section
import { PaymentNewCardDialog } from '../../payment';
import { StripePaymentMethod } from 'src/@types/stripe';

// ----------------------------------------------------------------------

type Props = {
  paymentMethods: StripePaymentMethod[];
  mutate?: () => void;
};

export default function AccountBillingPaymentMethod({ paymentMethods, mutate }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
          <Typography
            variant="overline"
            sx={{
              flexGrow: 1,
              color: 'text.secondary',
            }}
          >
            Payment Methods
          </Typography>

          <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
            New card
          </Button>
        </Stack>

        <Stack
          spacing={2}
          direction={{
            xs: 'column',
            md: 'column',
          }}
        >
          {paymentMethods.map((method) => (
            <Paper
              key={method.id}
              variant="outlined"
              sx={{
                p: 3,
                width: 1,
                position: 'relative',
              }}
            >
              <Image
                alt="icon"
                src={
                  method.brand.toLowerCase() === 'mastercard'
                    ? '/assets/icons/payments/ic_mastercard.svg'
                    : '/assets/icons/payments/ic_visa.svg'
                }
                sx={{ mb: 1, maxWidth: 36 }}
              />

              <Typography variant="subtitle2">{`**** **** **** ${method.last4}`}</Typography>

              <IconButton
                sx={{
                  top: 8,
                  right: 8,
                  position: 'absolute',
                }}
              >
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </Paper>
          ))}
        </Stack>
      </Card>

      <PaymentNewCardDialog open={open} onClose={handleClose} mutate={mutate} />
    </>
  );
}
