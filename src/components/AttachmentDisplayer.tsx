import { Stack, Typography, PaperProps } from '@mui/material';
// hooks

import FileThumbnail from './file-thumbnail';
import { Attachment } from 'src/@types/course';

interface ViewPdfProps extends PaperProps {
  file: Attachment;
}

export function AttachmentDisplayer({ file, sx, ...other }: ViewPdfProps) {
  const openPdf = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          p: 1,
          borderRadius: 2,
          cursor: 'pointer',
          ...sx,
        }}
        {...other}
      >
        <FileThumbnail file="pdf" />
        <Stack
          sx={{
            ml: 1,
            width: 1,
          }}
        >
          <Typography
            noWrap
            sx={{ textDecoration: 'underline' }}
            onClick={() => openPdf(file.fileUrl)}
          >
            {file.title}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
