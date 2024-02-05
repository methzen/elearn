// next
import Head from 'next/head';
// layouts
import CompactLayout from '../layouts/compact';
// ----------------------------------------------------------------------

Onboard.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Onboard() {
  return (
    <>
      <Head>
        <title> Onboarding... </title>
      </Head>
    <h1>Onboarding...</h1>
    </>
  );
}
