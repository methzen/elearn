import * as Yup from 'yup';

// ----------------------------------------------------------------------

export const FormSchema = Yup.object().shape({
  name: Yup.string()
    .required('name is required')
    .min(6, 'Mininum 6 characters')
    .max(32, 'Maximum 32 characters'),
  image: Yup.mixed().required('Single upload is required').nullable(true),
  description: Yup.string().required('Editor is required'),
  price: Yup.number(),
  community: Yup.boolean(),
  plan: Yup.string()
});
