// next
import Head from 'next/head';
import SimpleLayout from '../../layouts/simple';
import CircleGuard from 'src/auth/CircleGuard';
import About from 'src/sections/group/about';

AboutPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Head>
        <title> Circle | About </title>
      </Head>
      <CircleGuard>
          <About/>
      </CircleGuard>
    </>
  );
}
