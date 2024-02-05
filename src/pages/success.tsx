// next
import Head from 'next/head';
// layouts
import CompactLayout from '../layouts/compact';
// ----------------------------------------------------------------------

Success.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Success() {
  return (
    <>
      <Head>
        <title> success </title>
      </Head>
    <h1> connect account success!</h1>
    </>
  );
}
