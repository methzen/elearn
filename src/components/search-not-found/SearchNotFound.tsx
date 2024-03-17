import { Paper, PaperProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends PaperProps {
  query?: string;
  lengthCondition?: number;
}

export default function SearchNotFound({ query, lengthCondition, sx, ...other }: Props) {
  const criteria = lengthCondition ? !!(query && query.length >= lengthCondition) : !!query;
  return criteria ? (
    <Paper
      sx={{
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" paragraph>
        Not found
      </Typography>

      <Typography variant="body2">
        No results found for &nbsp;
        <strong>&quot;{query}&quot;</strong>.
        <br /> Try checking for typos or using complete words.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2" sx={sx}>
      {lengthCondition ? `${'Please enter more characters'}` : `${'Please enter keywords'}`}
    </Typography>
  );
}
