import { useEffect, useState } from 'react';
// @mui
import { Box } from '@mui/material';
import getAllGroupsByPage from 'src/api/getAllGroupsByPage';
import CourseCard, {Circle} from 'src/components/CourseCard';
// ----------------------------------------------------------------------

export default function ProfileCircles() {
  const [data, setData] = useState<Circle[]>([])

  useEffect(() => {
    const getData = async () => {
      const {items} = await getAllGroupsByPage(`/groups/get/all?page=${1}` as string)
      if (items){
        setData([...items])
      }
    };
    getData();
  },[]);

  return (
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
  );
}
