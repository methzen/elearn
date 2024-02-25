// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// @mui
import { Box } from '@mui/material';
//
const Header = dynamic(() => import('./Header'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
  pageName?: string;
};

export default function MainLayout({ children, pageName }: Props) {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Header pageName={pageName} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
