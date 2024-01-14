import { Card, Grid} from '@mui/material';
// routes
// @types
import { CircleFormProps } from '../form/CreateGroupForm';
import { CreateGroupForm } from '../form';
import CourseCardAside from 'src/components/CourseCardAside';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentCircle: CircleFormProps;
};

export default function EditCircle({ isEdit=true, currentCircle }: Props) {

  const data = {
    imageUrl: currentCircle.imageUrl as string,
    description: currentCircle.description,
    name: currentCircle.name
  }

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <CreateGroupForm {...{
            isEdit: true,
            FormSchema : currentCircle, 
            submitData : (content) => console.log('update data', content)
          }}/>

          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
        <CourseCardAside {...data}/>
        </Grid>
      </Grid>
  );
}
