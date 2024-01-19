import * as Yup from 'yup';

// ----------------------------------------------------------------------

export const courseDataSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  imageUrl: Yup.mixed().required('Images is required'),
  isPaying: Yup.boolean(),
  community: Yup.boolean(),
  plans: Yup.string(),
  month: Yup.number(),
  year: Yup.number(),
  oneTime: Yup.number()
});
