import { Box, Card, Grid} from '@mui/material';
// routes
// @types
import { CircleFormProps } from '../form/CreateGroupForm';
import { CreateGroupForm } from '../form';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentCircle?: CircleFormProps;
};

export default function EditCircle({ isEdit=true, currentCircle }: Props) {

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <CreateGroupForm {...{
            isEdit: true,
            FormSchema : currentCircle, 
            submitData : (data)=> console.log('update data', data)
          }}/>

          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              
            </Card>
        </Grid>
      </Grid>
  );
}
