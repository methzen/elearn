import NextLink from 'next/link';
// @mui
import { Stack, Button, Typography, StackProps, IconButton } from '@mui/material';
// components
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  title: string;
  subTitle?: string;
  link?: string;
  onOpen?: VoidFunction;
  collapse?: boolean;
  onCollapse?: VoidFunction;
}

export default function SectionPanel({
  title,
  subTitle,
  link,
  onOpen,
  collapse,
  onCollapse,
  sx,
  ...other
}: Props) {
  return (
    <Stack direction="row" sx={{ mb: 3, ...sx }} {...other}>
      <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
        <Typography> {title} </Typography>
        <IconButton
          size="small"
          color="success"
          onClick={onOpen}
          sx={{
            p: 0,
            width: 24,
            height: 24,
            color: 'common.white',
            bgcolor: 'success.main',
            '&:hover': {
              bgcolor: 'success.main',
            },
          }}
        >
          <Iconify icon="eva:plus-fill" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
