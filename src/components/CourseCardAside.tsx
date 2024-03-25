import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { GroupAboutProps } from 'src/auth/CircleGuard';
import { Box, Stack } from '@mui/system';
import { fShortenNumber } from 'src/utils/formatNumber';
import { Divider, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import Iconify from './iconify';
import { useSnackbar } from './snackbar';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';

export default function CourseCardAside({
  name,
  imageUrl,
  contributions,
  groupUrl,
}: {
  name: string;
  imageUrl: string;
  contributions: number;
  groupUrl: string;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const urlLink = groupUrl;
  const { copy } = useCopyToClipboard();

  const onCopy = (text: string) => {
    if (text) {
      enqueueSnackbar('Copied!');
      copy(text);
    }
  };
  return (
    <Card sx={{ marginTop: 2 }}>
      <CardMedia sx={{ height: 180 }} title="green iguana">
        <div style={{ position: 'relative', width: '100%', height: '160px' }}>
          <Image src={imageUrl} alt={name} fill />
        </div>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {description}
        </Typography> */}
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ pt: 3 }}>
          <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
              Total members
            </Typography>
            <Typography variant="subtitle1">{fShortenNumber(1)}</Typography>
          </div>
          <div>
            <>
              <Typography
                variant="caption"
                component="div"
                sx={{ mb: 0.75, color: 'text.disabled' }}
              >
                Contributions
              </Typography>
              <Typography variant="subtitle1">
                {fShortenNumber(contributions ? contributions : 0)}
              </Typography>
            </>
          </div>
        </Box>

        <Stack spacing={2} sx={{ pt: 3 }}>
          <TextField
            label="Share the link"
            fullWidth
            value={urlLink}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Copy">
                    <IconButton onClick={() => onCopy(urlLink)}>
                      <Iconify icon="eva:copy-fill" width={24} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
