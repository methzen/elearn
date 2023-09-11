// next
import Head from 'next/head';
import { Container, Typography, Box } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import CourseCard from '../../components/CourseCard';

// ----------------------------------------------------------------------

PageTwo.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
const text = `Praesent ac sem eget est egestas volutpat. Phasellus viverra nulla ut metus varius
laoreet. Curabitur ullamcorper ultricies nisi. Ut non enim eleifend felis pretium feugiat.
Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Fusce vel dui. Quisque
libero metus, condimentum nec, tempor a, commodo mollis, magna. In enim justo, rhoncus ut,
imperdiet a, venenatis vitae, justo. Cras dapibus.`

type Course={
  name: string
  id: string
  cover: string
  description: string
}

const Courses= [
  {
    name:"Docker Course",
    id: '1',
    cover:"/assets/images/courses/docker.jpg",
    description: text,
  },
  {
    name:"React Course",
    id: '2',
    cover:"/assets/images/courses/nextjs.jpg",
    description: text,
  },
  {
    name:"TypeScript Course",
    id: '3',
    cover:"/assets/images/courses/react.jpg",
    description: text,
  }
]

export default function PageTwo() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Page Two | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Page Two
        </Typography>

        <Typography gutterBottom>
          Curabitur turpis. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc,
          vitae euismod ligula urna in dolor. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit
          id, lorem. Phasellus blandit leo ut odio. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae; Fusce id purus. Aliquam lorem ante, dapibus in,
          viverra quis, feugiat a, tellus. In consectetuer turpis ut velit. Aenean posuere, tortor
          sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.
          Vestibulum suscipit nulla quis orci. Nam commodo suscipit quam. Sed a libero.
        </Typography>
        <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
    >
      {Courses.map((course, index) =>
          <CourseCard key={index} {...course}/>
      )}
    </Box>
      </Container>
    </>
  );
}
