// next
import Head from 'next/head';
// layouts
import CompactLayout from '../layouts/compact';
// sections
import Verify from '../sections/auth/Verify';
import VerifyGard from 'src/auth/VerifyGuard';
// ----------------------------------------------------------------------

VerifyCodePage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  return (
    <>
      <Head>
        <title> Verify </title>
      </Head>
      <VerifyGard>
        <Verify />
      </VerifyGard>
    </>
  );
}
