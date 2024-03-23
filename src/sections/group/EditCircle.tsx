import { Card, Grid } from '@mui/material';
// routes
// @types
import { CircleFormProps } from '../form/CreateGroupForm';
import { CreateGroupForm } from '../form';
import CourseCardAside from 'src/components/CourseCardAside';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentCircle: CircleFormProps;
  update: (data: CircleFormProps) => void;
  isLoading: boolean;
};

export default function EditCircle({ isEdit = true, currentCircle, update, isLoading }: Props) {
  const data = {
    imageUrl: currentCircle.imageUrl as string,
    description: currentCircle.description,
    name: currentCircle.name,
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3, marginTop: 2 }}>
          <CreateGroupForm
            {...{
              isEdit: true,
              FormSchema: currentCircle,
              submitData: (data) => update({ ...data, id: currentCircle.id }),
              isLoading: isLoading,
            }}
          />
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <CourseCardAside {...data} />
      </Grid>
    </Grid>
  );
}
