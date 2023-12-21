import { useEffect, useState } from 'react';
// @mui
import { Box, Typography } from '@mui/material';
import getAllGroupsByPage from 'src/api/getAllGroupsByPage';
import CourseCard, {Circle} from 'src/components/CourseCard';
// ----------------------------------------------------------------------

export default function ProfileCircles() {
  const [data, setData] = useState<Circle[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getData = async () => {
      const {items} = await getAllGroupsByPage(`/groups/get/all?page=${page}` as string)
      if (items){
        setData([...items])
      }
    };
    getData();
  },[]);

  return (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        Your circles
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {data && data?.map((course:any) =>
            <CourseCard key={course.id} {...course}/>
          )}
      </Box>
    </>
  );
}
