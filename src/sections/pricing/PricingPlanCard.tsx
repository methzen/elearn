// @mui
import { Card, Button, Typography, Box, Stack, CardProps } from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
// assets
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../../assets/icons';
import { PATH_PAGE } from 'src/routes/paths';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  selected: 'month' | 'year';
  card: {
    subscription: string;
    prices: { month: { amount: number; id: string }; year: { amount: number; id: string } };
    caption: string;
    labelAction: string;
    lists: {
      text: string;
      isAvailable: boolean;
    }[];
  };
  index: number;
}

export default function PricingPlanCard({ card, index, selected = 'month', sx, ...other }: Props) {
  const { subscription, prices, caption, lists, labelAction } = card;

  return (
    <Card
      sx={{
        p: 5,
        boxShadow: (theme) => theme.customShadows.z24,
        ...((index === 0 || index === 1) && {
          boxShadow: 'none',
          bgcolor: 'background.default',
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }),
        ...sx,
      }}
      {...other}
    >
      {index === 1 && (
        <Label color="info" sx={{ top: 16, right: 16, position: 'absolute' }}>
          POPULAR
        </Label>
      )}

      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        {subscription}
      </Typography>
      <Stack spacing={1} direction="row" sx={{ my: 2 }}>
        <Typography variant="h5">$</Typography>
        <Typography variant="h2">
          {prices[selected].amount === 0 ? 'Free' : prices[selected].amount}
        </Typography>
        <Typography component="span" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
          /{selected}
        </Typography>
      </Stack>
      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize',
        }}
      >
        {caption}
      </Typography>

      <Box sx={{ width: 80, height: 80, mt: 5 }}>
        {subscription === 'Basic' ? <PlanStarterIcon /> : <PlanPremiumIcon />}
      </Box>

      <Stack component="ul" spacing={2} sx={{ p: 0, my: 5 }}>
        {lists.map((item) => (
          <Stack
            key={item.text}
            component="li"
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              typography: 'body2',
              color: item.isAvailable ? 'text.primary' : 'text.disabled',
            }}
          >
            <Iconify
              icon={item.isAvailable ? 'eva:checkmark-fill' : 'eva:close-fill'}
              width={16}
              sx={{
                color: item.isAvailable ? 'primary.main' : 'inherit',
              }}
            />
            <Typography variant="body2">{item.text}</Typography>
          </Stack>
        ))}
      </Stack>

      <Button
        fullWidth
        size="large"
        variant="contained"
        href={`${PATH_PAGE.payment}?p=${subscription}`}
      >
        {labelAction}
      </Button>
    </Card>
  );
}
