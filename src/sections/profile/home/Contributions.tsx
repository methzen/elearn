// @mui
import { Card, Stack, Typography, Divider } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// @types
import { IUserProfileContribution } from '../../../@types/user';

// ----------------------------------------------------------------------

export default function Contribution({ contribution, karma }: IUserProfileContribution) {
  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(contribution)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Contributions
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(karma)}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Points
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
