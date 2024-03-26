import { Box } from '@mui/material';
import CourseCard, { Circle } from 'src/components/CourseCard';
// ----------------------------------------------------------------------

export default function ProfileCircles({ circles, myProfile}: { circles?: Circle[], myProfile?:boolean }) {
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
      {circles && circles?.map((course: any) => <CourseCard key={course._id} circle={course} myProfile={myProfile}/>)}
    </Box>
  );
}
