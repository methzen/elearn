// @mui
import { Stack, Link, Button, Typography } from '@mui/material';
// utils
import { fDate, fTimestamp, fToNow } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import { CustomerStripeInvoice } from 'src/@types/stripe';

// ----------------------------------------------------------------------

type Props = {
  invoices: CustomerStripeInvoice[];
  has_more: boolean
  getMoreInvoices: ()=>void;
};

export default function AccountBillingInvoiceHistory({ invoices, has_more, getMoreInvoices }: Props) {
  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="overline" sx={{ width: 1, color: 'text.secondary' }}>
        Invoice History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {invoices.map((invoice) => (
          <Stack key={invoice.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 120 }}>
            {/* multiplied by 1000 so that the argument is in milliseconds, not seconds */}
              {fDate(invoice.status_transitions.paid_at*1000)}
            </Typography>

            <Typography variant="body2">{fCurrency(invoice.amount_paid/100)}</Typography>

            <Link href={invoice.hosted_invoice_url}>PDF</Link>
          </Stack>
        ))}
      </Stack>

      {has_more && 
      <Button
        onClick={getMoreInvoices}
        size="small" color="inherit" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
        All invoices
      </Button>}
    </Stack>
  );
}
