//
import Image from '../../image';
//
import { CustomFile } from '../types';
// @mui
import { Box, Stack, Typography, PaperProps } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fData } from '../../../utils/formatNumber';
// components
import FileThumbnail from '../../file-thumbnail';
// ----------------------------------------------------------------------

type Props = {
  file: CustomFile | string | null;
};

export default function SingleFilePreview({ file }: Props) {
  if (!file) {
    return null;
  }

  const imgUrl = typeof file === 'string' ? file : file.preview;

  return (
    <Image
      alt="file preview"
      src={imgUrl}
      sx={{
        top: 8,
        left: 8,
        zIndex: 8,
        borderRadius: 1,
        position: 'absolute',
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 16px)',
      }}
    />
  );
}

// ----------------------------------------------------------------------

interface ViewPdfProps extends PaperProps {
  file: CustomFile | string | null;
}

export function FileGeneralRecentCard({ file, sx, ...other }: ViewPdfProps) {
  const isDesktop = useResponsive('up', 'sm');

  return (
    <>
      <Stack
        spacing={isDesktop ? 1.5 : 2}
        direction={isDesktop ? 'row' : 'column'}
        alignItems={isDesktop ? 'center' : 'flex-start'}
        sx={{
          p: 2.5,
          borderRadius: 2,
          position: 'relative',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          '&:hover': {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          },
          ...(isDesktop && {
            p: 1.5,
            borderRadius: 1.5,
          }),
          ...sx,
        }}
        {...other}
      >
        <FileThumbnail file="pdf" />
        <Stack
          sx={{
            width: 1,
            flexGrow: { sm: 1 },
            minWidth: { sm: '1px' },
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {(file as CustomFile).name}
          </Typography>

          <Stack
            spacing={0.75}
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', color: 'text.disabled', mt: 0.5 }}
          >
            <Box> {fData((file as CustomFile).size)} </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
