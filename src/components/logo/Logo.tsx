import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
import { Link, BoxProps } from '@mui/material';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    if (disabledLink) {
      return <WorkspacesIcon />;
    }

    return (
      <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
        <WorkspacesIcon sx={{ fontSize: 50 }} />
      </Link>
    );
  }
);

export default Logo;
