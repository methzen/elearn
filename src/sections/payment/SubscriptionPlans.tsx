import { useState } from 'react';
// @mui
import {
  Box,
  Stack,
  Paper,
  Radio,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { InnerCirclePlan } from 'src/@types/innerCircle';


interface SubscriptionProps{
  plans: InnerCirclePlan[];
  susbcriptionName: string;
  selectPlan: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SubscriptionPlans({plans, susbcriptionName, selectPlan}: SubscriptionProps) {
  return (
    <>
      <Stack spacing={5}>
        <Typography variant="h6">Your Current Plan</Typography>
        <RadioGroup value={susbcriptionName} onChange={selectPlan}>
          <Stack spacing={3}>
            {plans.map((plan) => (
              <PaymentOption
                key={plan.subscription}
                plan={plan}
                isSelected={susbcriptionName === plan.subscription}
                hasChild={true}
              />
            ))}
          </Stack>
        </RadioGroup>
      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------

type PaymentOptionProps = {
  plan: InnerCirclePlan;
  hasChild: boolean;
  isSelected: boolean;
};

function PaymentOption({
  plan,
  hasChild,
  isSelected,
}: PaymentOptionProps) {

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        transition: (theme) => theme.transitions.create('all'),
        ...(hasChild && {
          flexWrap: 'wrap',
        })
      }}
    >
      <FormControlLabel
        value={plan.subscription}
        control={<Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />}
        label={plan.subscription}
        sx={{ py: 2, pl: 2.5, flexGrow: 1, mr: 0 }}
      />

      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ position: 'absolute', right: 20, top: 24 }}
      >
        {plan.icons.map((icon) => (
          <Box component="img" key={icon} src={icon} />
        ))}
      </Stack>
      {isSelected && 
              <Stack
              alignItems="flex-start"
              sx={{
                px: 3,
                width: 1,
              }}
            >
          <Stack component="ul" spacing={2} sx={{ p: 0, my: 5 }}>
            {plan.lists.map((item) => (
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
            </Stack>
           
      }
    </Paper>
  );
}
